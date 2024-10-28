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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        const deviceData = deviceResponse.data;
        setDeviceData(deviceData);

        if (deviceData.type === "Sensor") {
          let tabelResponse = await getDataHistoryType(1, 2, guid_device, "2024-09-01", "2024-09-30");
          setTabel(Array.isArray(tabelResponse.data.data) ? tabelResponse.data.data : []);

          let historyResponse = await getDataHistoryType(1, 1, guid_device, "2024-09-01", "2024-09-30");
          setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);
        }

        const formattedDate = new Date(deviceData.updatedAt).toLocaleDateString("id-ID", {
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

  const HistoryTable = ({ tabel }) => (
    <table className="min-w-full h-68 text-left rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="py-3 px-4 text-xs font-semibold text-gray-700">Tanggal</th>
          <th className="py-3 px-4 text-xs text-right font-semibold text-gray-700">Waktu</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {tabel.map((tabel, index) => {
          const formattedTime = new Date(tabel.datetime).toLocaleTimeString("sv-SE", {
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
      <div key={index} className="p-6 mt-16">
        <Card
          guid_device={guidDevice}
          type={deviceData.type}
          title={deviceData.name}
          description={descript}
          date={formattedDate}
          buttonLabel="Lihat histori..."
          contenttable={<HistoryTable tabel={tabel} />}
          content={
            <div className="h-[22em] w-full">
              <MapContainer center={[deviceData.latitude, deviceData.longitude]} zoom={11} style={{ height: '100%', width: '100%', borderRadius: '6px' }}>
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

  return (
    <div className="relative">
      {loading ? (
        <div>Loading...</div> // You can replace this with a simple loading message or another component if desired.
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>{renderCards}</>
      )}
    </div>
  );
};

export default Banner;
