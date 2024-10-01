import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import Card from "./card";

const Banner = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [tabel, setTabel] = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        const deviceData = deviceResponse.data;
        setDeviceData(deviceData);

        if (deviceData.type === "Aktuator") {
          let tabelResponse = await getDataHistoryType(1, 3, guid_device);
          setTabel(Array.isArray(tabelResponse.data.data) ? tabelResponse.data.data : []);

          let historyResponse = await getDataHistoryType(1, 1, guid_device);
          setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);
        }

        const formattedDate = new Date(deviceData.updatedAt).toLocaleDateString("id-ID", {
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

  const HistoryTable = ({ tabel }) => (
    <table className="min-w-full h-68 text-left mb-6">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="py-3 px-4 text-xs font-semibold text-gray-700">Tanggal</th>
          <th className="py-3 px-4 text-xs text-right font-semibold text-gray-700">Waktu</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {tabel.map((tabel, index) => {
          const formattedTime = new Date(tabel.datetime).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const formattedDate = new Date(tabel.datetime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          });

          return (
            <tr key={index} className="hover:bg-gray-100 transition-colors duration-150">
              <td className="py-3 px-4 text-xs text-gray-700">{formattedDate}</td>
              <td className="py-3 px-4 text-xs text-right text-gray-700">{formattedTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderCards = historyData.map((history, index) => {
    const guidDevice = history.guid_device;
    const descript = history.guid_device;

    return (
      <div key={index} className="p-6 bg-gray-100 h-[35.5em]">
        <Card
          guid_device={guidDevice}
          type={deviceData.type}
          title={deviceData.name}
          description={descript}
          date={formattedDate}
          buttonLabel="Lihat histori..."
          contenttable={<HistoryTable tabel={tabel} />}
          content={
            <div className="h-[25em] w-full">
              <MapContainer center={[deviceData.latitude, deviceData.longitude]} zoom={10} style={{ height: '100%', width: '100%', borderRadius: '6px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  key={deviceData.guid}
                  position={[deviceData.latitude, deviceData.longitude]}>
                  <Popup>
                    <div>
                      <strong className="flex justify-center">{deviceData.name}</strong>
                      <p className="text-xs">Latitude: {deviceData.latitude} | Longitude: {deviceData.longitude}</p>
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

  const SkeletonLoader = () => (
    <div className="p-6 bg-gray-100 h-[35.5em]">
      <div className="flex space-x-6 mt-8 animate-pulse">
      <div className="w-1/3 space-y-6">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
  
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
  
      <div className="flex-1 space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    </div>
  );
  
  return (
    <div className="relative">
      {loading ? <SkeletonLoader /> : renderCards}
    </div>
  );
};

export default Banner;
