import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Search from '../../../Component/Landing/Banner/search';
import { getDataDeviceByCompany } from '../../../Api/service/service';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Loader from './load';
import '../../../Component/Landing/Banner/marker.css';

const Banner = () => {
    const [activeTab, setActiveTab] = useState('Camera');
    const [activeMarker, setActiveMarker] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef();
    const navigate = useNavigate();

    // Fetch data based on the active tab
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Show loader while data is being fetched
            console.log(activeTab);
            try {
                const response = await getDataDeviceByCompany(activeTab);
                // console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false); // Hide loader after data is fetched
            }
        };

        fetchData();
    }, [activeTab]); // Adding activeTab to the dependency array to fetch new data on tab change

    const handleSearch = useCallback((searchTerm) => {
        const marker = data.find((m) =>
            m.guid === searchTerm ||
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (searchTerm.includes(",") && checkCoordinates(searchTerm, m))
        );
        if (marker && mapRef.current) {
            mapRef.current.setView([marker.latitude, marker.longitude], 13);
            setActiveMarker(marker);
        } else {
            console.log('Titik Lokasi Tidak Ditemukan');
        }
    }, [data]);

    const checkCoordinates = (searchTerm, marker) => {
        const [lat, lng] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
        return Math.abs(marker.latitude - lat) < 0.0001 && Math.abs(marker.longitude - lng) < 0.0001;
    };

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker);
    };

    const handleNavigation = (route) => {
        if (activeMarker) {
            navigate(route.replace(':guid_device', activeMarker.guid_device));
        }
    };

    const getMarkerIcon = () => {
        const color = getMarkerColor();
        return L.divIcon({
            className: 'custom-icon',
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2" fill="${color}"/>
                    <path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
            iconSize: [24, 24],
            iconAnchor: [0, 0],
            popupAnchor: [0, -24]
        });
    };

    const getMarkerColor = () => {
        switch (activeTab) {
            case 'Sensor':
                return '#ff6347'; // Tomato
            case 'Aktuator':
                return '#32cd32'; // Lime
            default:
                return '#1e90ff'; // Dodger Blue
        }
    };

    const renderMap = () => (
        <MapContainer
            center={[-4.9863819, 105.7276469]}
            zoom={10}
            style={{ height: '100%', width: '100%', borderRadius: '8px' }}
            whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((marker) => (
                <Marker
                    key={marker.guid}
                    position={[marker.latitude, marker.longitude]}
                    icon={getMarkerIcon()}
                    eventHandlers={{ click: () => handleMarkerClick(marker) }}
                >
                    <Popup>
                        <div className="text-sm text-gray-800">
                            <strong>{marker.name}</strong>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => handleNavigation(`/detail-perangkat/${marker.type}/${marker.deviceGuid}`)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-600"
                                >
                                    Detail
                                </button>
                                <button
                                    onClick={() => handleNavigation(`/history-perangkat/${marker.type}/${marker.deviceGuid}`)}
                                    className="bg-green-500 text-white px-2 py-1 rounded-md transition-colors duration-300 ease-in-out hover:bg-green-600"
                                >
                                    History
                                </button>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );

    return (
        <>
            <div className="relative flex justify-center items-center w-full">
                <div className="w-[74em] mt-[2.5em] bg-white border border-gray-200 rounded-lg shadow-lg">

                    <div className="w-full flex justify-between items-center p-4">    
                        <ul className="flex justify-start text-sm font-medium text-gray-500 ml-6 space-x-4">
                            {['Camera', 'Sensor', 'Aktuator'].map(tab => (
                                <li
                                    key={tab}
                                    className={`cursor-pointer p-4 hover:text-blue-600 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </li>
                            ))}
                        </ul>
                        <div className="inline-block align-bottom">
                            <Search onSearch={handleSearch} />
                        </div>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader />
                            </div>
                        ) : (
                            <div className="w-full h-96 bg-white rounded-lg relative">
                                {renderMap()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;




// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import Search from '../../../Component/Landing/Banner/search';
// import { getDataDevice,getDataDeviceByCompany } from '../../../Api/service/service';
// import { useNavigate } from 'react-router-dom';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import Loader from './load';
// import '../../../Component/Landing/Banner/marker.css';

// const Banner = () => {
//     const [activeTab, setActiveTab] = useState('Camera');
//     const [activeMarker, setActiveMarker] = useState(null);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const mapRef = useRef();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log(activeTab);
//             try {
//                 const response = await getDataDeviceByCompany(activeTab);
//                 console.log(response.data)
//                 setData(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSearch = useCallback((searchTerm) => {
//         const marker = data.find((m) =>
//             m.guid === searchTerm ||
//             m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (searchTerm.includes(",") && checkCoordinates(searchTerm, m))
//         );
//         if (marker && mapRef.current) {
//             mapRef.current.setView([marker.latitude, marker.longitude], 13);
//             setActiveMarker(marker);
//         } else {
//             console.log('Titik Lokasi Tidak Ditemukan');
//         }
//     }, [data]);

//     const checkCoordinates = (searchTerm, marker) => {
//         const [lat, lng] = searchTerm.split(',').map(coord => parseFloat(coord.trim()));
//         return Math.abs(marker.latitude - lat) < 0.0001 && Math.abs(marker.longitude - lng) < 0.0001;
//     };

//     const handleMarkerClick = (marker) => {
//         setActiveMarker(marker);
//     };

//     const handleNavigation = (route) => {
//         if (activeMarker) {
//             navigate(route.replace(':guid_device', activeMarker.guid_device));
//         }
//     };

//     const getMarkerIcon = () => {
//         const color = getMarkerColor();
//         return L.divIcon({
//             className: 'custom-icon',
//             html: `
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <circle cx="12" cy="12" r="10" stroke="${color}" stroke-width="2" fill="${color}"/>
//                     <path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>
//             `,
//             iconSize: [24, 24],
//             iconAnchor: [0, 0],
//             popupAnchor: [0, -24]
//         });
//     };

//     const getMarkerColor = () => {
//         switch (activeTab) {
//             case 'Sensor':
//                 return '#ff6347'; // Tomato
//             case 'Aktuator':
//                 return '#32cd32'; // Lime
//             default:
//                 return '#1e90ff'; // Dodger Blue
//         }
//     };

//     const renderMap = () => (
//         <MapContainer
//             center={[-6.595038, 106.816635]}
//             zoom={8}
//             style={{ height: '100%', width: '100%', borderRadius: '8px' }}
//             whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
//         >
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {data.map((marker) => (
//                 <Marker
//                     key={marker.guid}
//                     position={[marker.latitude, marker.longitude]}
//                     icon={getMarkerIcon()}
//                     eventHandlers={{ click: () => handleMarkerClick(marker) }}
//                 >
//                     <Popup>
//                         <div className="text-sm text-gray-800">
//                             <strong>{marker.name}</strong>
//                             <div className="mt-2 flex gap-2">
//                                 <button
//                                     onClick={() => handleNavigation('/detail-perangkat/:guid_device')}
//                                     className="bg-blue-500 text-white px-2 py-1 rounded-md transition-colors duration-300 ease-in-out hover:bg-blue-600"
//                                 >
//                                     Detail
//                                 </button>
//                                 <button
//                                     onClick={() => handleNavigation('/history-perangkat/:guid_device')}
//                                     className="bg-green-500 text-white px-2 py-1 rounded-md transition-colors duration-300 ease-in-out hover:bg-green-600"
//                                 >
//                                     History
//                                 </button>
//                             </div>
//                         </div>
//                     </Popup>
//                 </Marker>
//             ))}
//         </MapContainer>
//     );

//     return (
//         <>
//             <div className="relative flex justify-center items-center w-full">
//                 <div className="w-[74em] mt-[2.5em] bg-white border border-gray-200 rounded-lg shadow-lg">

//                     <div className="w-full flex justify-between items-center p-4">    
//                         <ul className="flex justify-start text-sm font-medium text-gray-500 ml-6 space-x-4">
//                             {['Camera', 'Sensor', 'Aktuator'].map(tab => (
//                                 <li
//                                     key={tab}
//                                     className={`cursor-pointer p-4 hover:text-blue-600 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
//                                     onClick={() => setActiveTab(tab)}
//                                 >
//                                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                                 </li>
//                             ))}
//                         </ul>
//                         <div className="inline-block align-bottom">
//                             <Search onSearch={handleSearch} />
//                         </div>
//                     </div>

//                     <div className="p-4">
//                         {loading ? (
//                             <div className="flex justify-center items-center h-64">
//                                 <Loader />
//                             </div>
//                         ) : (
//                             <div className="w-full h-96 bg-white rounded-lg relative">
//                                 {renderMap()}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Banner;
