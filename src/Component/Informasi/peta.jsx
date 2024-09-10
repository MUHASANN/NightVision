import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getDataDevice } from "../../Api/service/service";

import { RxMagnifyingGlass } from "react-icons/rx";
import Gajah from "../../asset/CCTV/Gajah_Giring.jpeg";

const Peta = () => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const mapRef = useRef(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await getDataDevice();
            setLocations(response.data);
        } catch (error) {
            console.log("Failed to fetch data: ", error);
        }
    };

    const handleSearch = () => {
        const location = locations.find(
            (loc) => loc.guid_device.toLowerCase() === searchQuery.toLowerCase()
        );
        if (location && mapRef.current) {
            mapRef.current.setView([location.latitude, location.longitude], 14);
        } else {
            alert("Device not found");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="w-full h-[40em] bg-gray-50 flex justify-center items-start">
            <div className="w-full h-full bg-white rounded-lg relative">
                <MapContainer
                    center={[-5.158422372817004, 105.76494541440101]}
                    zoom={10}
                    className="h-full w-full rounded-lg z-0"
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location, index) => (
                        <Marker key={index} position={[location.latitude, location.longitude]}>
                            <Popup>
                                <div className="text-center w-[150px]">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={Gajah}
                                            alt="Lokasi"
                                            className="w-full h-auto rounded-md mt-3 cursor-pointer"
                                        />
                                    </a>
                                    <p className="text-sm text-gray-600">
                                        22/08/2024
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="absolute top-3 left-0 w-[56em] ml-[20em] flex justify-between items-center p-3 bg-white rounded-lg shadow-lg z-10">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex justify-center items-center ml-2">
                        {/* Add icon or content here */}
                    </div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex justify-center items-center ml-2">
                        {/* Add icon or content here */}
                    </div>
                    <div className="w-8 h-8 bg-green-400 rounded-full flex justify-center items-center ml-2 mr-2">
                        {/* Add icon or content here */}
                    </div>
                    <div className="flex-grow mx-4 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[32em] h-8 p-2 rounded bg-gray-200 border border-gray-300"
                            placeholder="Search..."
                        />
                          <RxMagnifyingGlass className="absolute right-14 top-2 text-gray-400" />
                    </div>
                    <h2 className="text-gray-900 text-lg font-semibold mr-12">
                        PETA LOKASI
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Peta;
