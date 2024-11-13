import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carddetail from "./card";
import { SecurityCamera, CalendarDots } from '@phosphor-icons/react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  getDataDeviceByGuid,
  getDataHistoryType,
} from "../../Api/service/service";
import "ldrs/tailspin";

const Banner = () => {
  const { guid_device } = useParams();
  const [device, setDevice] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});
  const [formattedDates, setFormattedDate] = useState("");
  const [formattedTime, setformattedTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        setDevice(deviceResponse.data);

        let historyResponse;
        if (deviceResponse.data.type === "Camera") {
          historyResponse = await getDataHistoryType(1, 1, guid_device, "2024-09-01", "2024-09-30");
        }
        setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);

        const formattedDate = new Date(deviceResponse.data.updatedAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guid_device]);

  useEffect(() => {
    const ws = new WebSocket(`wss://worker-cctv.pptik.id:8726`);
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      ws.send(JSON.stringify({ action: "subscribe", topic: guid_device }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRealTimeData(data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [guid_device]);

  const renderCards = historyData.map((history, index) => {
    const guidDevice = history.guid_device;
    const leftCardImage = history.value || notFoundImage;
    const deviceDescription = history.guid_device || "No description available";
    const deviceDate = history.datetime;

    return (
      <div key={guidDevice || index}>
        <Carddetail
          key={guidDevice || index}
          guid_device={guidDevice}
          type={device.type}
          leftcard={
            <div className="flex justify-center">
              <div className="p-4 w-72 bg-white rounded-lg shadow-md hover:shadow-xl transition-colors duration-300">
                <h3 className="text-md font-semibold mb-2">Data Terakhir</h3>
                <img
                  src={`https://smartparking.pptik.id/data/data/${leftCardImage}`}
                  alt="Realtime Image"
                  className="w-full h-[200px] object-cover rounded-lg mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cctv-tnwk.pptik.id/images/no-image.png";
                  }}
                />
                <p className="text-sm text-gray-600">Waktu: {deviceDate}</p>
              </div>
            </div>
          }
          leftcard2={
            <div className="flex justify-center">
              <div className="p-4 w-72 bg-white rounded-lg shadow-md hover:shadow-xl transition-colors duration-300">
                <h3 className="text-md font-semibold mb-2">Data Realtime</h3>
                <img
                  src={`https://smartparking.pptik.id/data/data/${
                    realTimeData.value
                  }`}
                  alt="Last Data Image"
                  className="w-full h-[200px] object-cover rounded-lg mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://cctv-tnwk.pptik.id/images/no-image.png";
                  }}
                />
                <p className="text-sm text-gray-600">
                  Waktu: {realTimeData.datetime || "No data available"}
                </p>
              </div>
            </div>
          }
          rightcard={
            <div>
              <div className="flex">
                <SecurityCamera size={24} color="#004462" weight="duotone" className="mr-2" />
                <h2 className="font-semibold text-gray-900 mb-2">{device.name}</h2>
              </div>
              <p className="w-96 bg-gray-100 p-2 rounded-lg text-gray-500 text-sm hover:shadow-sm">Guid Perangkat | {deviceDescription}</p>
            </div>
          }
          rightcard2={
            <div>
              <div className="flex">
                <CalendarDots size={24} color="#094462" weight="duotone" className="mr-1" />
                <h2 className="font-semibold text-gray-900 mb-2">Tanggal Registrasi:</h2>
              </div>
              <p className="w-96 bg-gray-100 p-2 rounded-lg text-gray-500 text-sm hover:shadow-sm">{formattedDates}</p>
            </div>
          }
          rightcard3={
            <div className="h-[18em] w-full">
              <MapContainer
                center={[device.latitude, device.longitude]}
                zoom={11}
                style={{ height: "100%", width: "100%", borderRadius: '6px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  key={device.guid}
                  position={[device.latitude, device.longitude]}
                >
                  <Popup>
                    <div>
                      <strong className="flex justify-center">{device.name}</strong>
                      <p className="flex justify-center">Latitude: {device.latitude} | Longitude: {device.longitude}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          }
        />
      </div>
    );
  });

  return (
    <div className="relative">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <l-tailspin size="50" stroke="5" speed="0.9" color="gray"></l-tailspin>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>{renderCards}</>
      )}
    </div>
  );
};

export default Banner;
