import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getDataDeviceByCompany, getDataDevice } from '../../../Api/service/service';
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Loader from '../load';
import './marker.css';

const Banner = () => {
    const [activeTab, setActiveTab] = useState('Camera');
    const [activeMarker, setActiveMarker] = useState(null);
    const [data, setData] = useState([]);
    const [datadevice, setDataDevice] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const responseCompany = await getDataDeviceByCompany();
                const devicesDataByCompany = responseCompany.data;

                const filteredData = devicesDataByCompany.find(item => item.type === activeTab) || [];
                setData(filteredData);

                const responseDevice = await getDataDevice(activeTab);
                setDataDevice(responseDevice.data);
                setFilteredDevices(responseDevice.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        setFilteredDevices(
            datadevice.filter(device => device.name.toLowerCase().includes(lowerCaseQuery))
        );
    }, [searchQuery, datadevice]);

    const getMarkerIcon = (isActive) => {
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
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
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

    const handleMarkerClick = (marker) => {
        setActiveMarker(marker);
    };

    const handleNavigation = (path) => {
        navigate(path);
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
            />
            {filteredDevices.map((marker) => {
                const isActive = activeMarker && activeMarker.guid === marker.guid;
                return (
                    <Marker
                        key={marker.guid}
                        position={[marker.latitude, marker.longitude]}
                        icon={getMarkerIcon(isActive)}
                        eventHandlers={{ click: () => handleMarkerClick(marker) }}
                    >
                        <Popup>
                            <div className="w-52 text-center">
                                <strong className="block text-lg font-semibold text-gray-800 mb-2">
                                    {marker.name}
                                </strong>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => handleNavigation(`/detail-perangkat/${marker.type}/${marker.deviceGuid}`)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-300 text-sm"
                                    >
                                        Detail
                                    </button>
                                    <button
                                        onClick={() => handleNavigation(`/history-perangkat/${marker.type}/${marker.deviceGuid}`)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition duration-300 text-sm"
                                    >
                                        Histori
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );

    return (
        <div className='mt-16'>
            <div className="relative flex justify-start items-center w-full p-7">
                <div className="w-full md:w-[80em] p-4 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                        <ul className="flex justify-start text-sm font-medium text-gray-500">
                            {['Camera', 'Sensor', 'Aktuator'].map(tab => (
                                <li
                                    key={tab}
                                    className={`cursor-pointer m-4 px-3 py-2 transition-colors duration-200 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </li>
                            ))}
                        </ul>
                            <div className="relative w-96 m-4">
                                <input
                                    type="text"
                                    placeholder="Cari nama perangkat..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border border-gray-300 rounded-md w-full px-4 py-2 text-sm pr-10"
                                />
                                <MagnifyingGlass size={21} className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400"/>
                            </div>
                        </div>

                    <hr />

                    <div className="p-4">
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-96">
                                <Loader />
                                <span className="mt-2 text-gray-500">Loading data, please wait...</span>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center h-96 text-red-500">
                                {error}
                            </div>
                        ) : (
                            <div className="w-full h-96 relative shadow-sm">
                                {renderMap()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
