import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import Card from "./card";
import "ldrs/tailspin";

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
        const { data: deviceResponse } = await getDataDeviceByGuid(guid_device);
        setDeviceData(deviceResponse);

        if (deviceResponse.type === "Aktuator") {
          const tabelResponse = await getDataHistoryType(1, 2, guid_device, "2024-09-01", "2024-09-30");
          setTabel(Array.isArray(tabelResponse.data.data) ? tabelResponse.data.data : []);

          const historyResponse = await getDataHistoryType(1, 1, guid_device, "2024-09-01", "2024-09-30");
          setHistoryData(Array.isArray(historyResponse.data.data) ? historyResponse.data.data : []);
        }

        const formattedDate = new Date(deviceResponse.updatedAt).toLocaleString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        setFormattedDate(formattedDate);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guid_device]);

  const renderCards = historyData.map((history, index) => {
    const guidDevice = history.guid_device;
    const descript = history.guid_device;
    const status = history.value == 1 ? "Aktif" : "Non-Aktif";

    return (
      <div key={index} className="p-6 mt-16">
        <Card
          guid_device={guidDevice}
          type={deviceData.type}
          title={deviceData.name}
          description={descript}
          date={formattedDate}
          buttonLabel="Lihat histori..."
          status={status}
          contenttable={<HistoryTable tabel={tabel} />}
          content={
            <div className="h-[20em] w-full">
              <MapContainer center={[deviceData.latitude, deviceData.longitude]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '6px' }}>
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

const HistoryTable = ({ tabel }) => (
  <table className="min-w-full text-left rounded-lg overflow-hidden">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="py-3 px-4 text-xs font-semibold text-gray-700">Tanggal</th>
        <th className="py-3 px-4 text-xs text-right font-semibold text-gray-700">Waktu</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {tabel.map((item, index) => {
        const formattedTime = new Date(item.datetime).toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const formattedDate = new Date(item.datetime).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
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

export default Banner;
