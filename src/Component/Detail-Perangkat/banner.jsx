import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carddetail from "./card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaCameraRetro } from "react-icons/fa";
import notFoundImage from "../../../public/404.png";
import {
  // getDataHistory,
  getDataDevice,
  getDataDeviceByGuid,
  getDataHistoryType,
} from "../../Api/service/service";

const Banner = () => {
  const { guid_device } = useParams();
  const [device, setDevice] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [formattedDates, setFormattedDate] = useState("");
  const [deviceDescription, setDeviceDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const device = await getDataDeviceByGuid(guid_device);
        setDevice(device.data);
        // console.log(device)
        // const historyResponse = await getDataHistory(1, 1, guid_device);
        // const deviceResponse = await getDataDevice();
        let historyResponse;
        console.log(device);
        if (device.data.type == "Camera") {
          historyResponse = await getDataHistoryType(1, 1, guid_device);
          console.log(historyResponse.data.data);
        }

        setHistoryData(
          Array.isArray(historyResponse.data.data)
            ? historyResponse.data.data
            : []
        );
        // setDeviceData(Array.isArray(deviceResponse) ? deviceResponse : []);

        const formattedDate = new Date(device.data.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setFormattedDate(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-6">
        <div className="animate-pulse w-full max-w-md">
          <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (historyData.length === 0 && deviceData.length === 0) {
    return <div className="flex justify-center p-10">No data available</div>;
  }

  if (historyData.length === 0) {
    return (
      <div className="flex justify-center p-10">
        <div>No history data available.</div>
      </div>
    );
  }

  const renderCards = historyData.map((history, index) => {
    const guidDevice = history.guid_device;
    const leftCardImage = history.value || notFoundImage;
    const deviceDescription = history.guid_device || "No description available";
    const deviceDate = history.datetime;

    return (
    <div className='p-1 bg-gray-100 h-[42.5em]'>
      <Carddetail
        key={index}
        guid_device={guidDevice}
        type={device.type}
        leftcard={
          <div className="flex justify-center">
            <div className="p-4 w-72 bg-white rounded-lg shadow-sm hover:shadow-md transition-colors duration-300">
              <h3 className="text-md font-semibold mb-2">Data Terakhir</h3>
              <img
                src={`https://smartparking.pptik.id/data/data/${leftCardImage}`}
                alt="Realtime Image"
                className="w-full h-[200px] object-cover rounded-lg mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg";
                }}
              />
              <p className="text-sm text-gray-600">Waktu: {deviceDate}</p>
            </div>
          </div>
        }
        leftcard2={
          <div className="flex justify-center">
            <div className="p-4 w-72 bg-white rounded-lg shadow-sm hover:shadow-md transition-colors duration-300">
              <h3 className="text-md font-semibold mb-2">Data Realtime</h3>
              <img
                src={`https://smartparking.pptik.id/data/data/${
                  realTimeData.value || notFoundImage
                }`}
                alt="Last Data Image"
                className="w-full h-[200px] object-cover rounded-lg mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg";
                }}
              />
              <p className="text-sm text-gray-600">
                Waktu: {realTimeData.datetime || "No data available"}
              </p>
            </div>
          </div>
        }
        centercard={
          <div className="flex justify-end items-center h-full">
            <span className="text-xl font-semibold text-gray-100">
              {device.type}
            </span>
            <FaCameraRetro className="text-gray-100 ml-2 text-2xl" />
          </div>
        }
        rightcard={
          <div>
            <h2 className="text-lg font-semibold">{device.name}</h2>
            <p className="mt-2 text-sm">{deviceDescription}</p>
          </div>
        }
        rightcard2={
          <div>
            <h2 className="text-xl font-semibold">Tanggal Registrasi</h2>
            <p className="text-sm mt-2">{formattedDates}</p>
          </div>
        }
        rightcard3={
          <div className="h-[23.5em] w-full">
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
              {/* ))} */}
            </MapContainer>
          </div>
        }
        />
    </div>
    );
  });

  return <div className="relative">{renderCards}</div>;
};

export default Banner;
