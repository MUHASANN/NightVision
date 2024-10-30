import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card"; // Adjust the path accordingly
import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import { ClockCounterClockwise, Calendar } from "@phosphor-icons/react";
import Modal from "./modal"; // Import the Modal component here

const Banner = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const itemsPerPage = 12;

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDateSelection = (start, end) => {
    const formattedStartDate = new Date(start).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedEndDate = new Date(end).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    setSelectedDateRange(`${formattedStartDate} - ${formattedEndDate}`);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const deviceResponse = await getDataDeviceByGuid(guid_device);
        const deviceData = deviceResponse.data;
        setDeviceData(deviceData);

        const historyResponse = await getDataHistoryType(1, 1000, guid_device, "2024-09-01", "2024-09-30");
        setHistoryData(historyResponse?.data?.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [guid_device]);

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 3);

  const currentItems = historyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="bg-white shadow-md rounded-lg p-5">
          <div className="flex justify-center items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{deviceData.name}</h1>
          </div>
          <div className="flex justify-center">
            <span className="text-md text-gray-500 font-semibold">
              Riwayat/Histori pengambilan gambar dan informasi waktu pada perangkat.
            </span>
          </div>
        </div>
      </div>

      <div className=" flex justify-between">
        <div className="mb-2 p-2">
          <div className="flex">
            <Calendar size={24} weight="duotone" />
            <p className="mb-1 ml-1 ">Pilih tanggal:</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="bg-white shadow-md text-gray-600 text-sm p-2 px-8 rounded-lg items-center text-left transition duration-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Pilih Tanggal"
          >
            <span className="text-sm">{selectedDateRange || "..."}</span>
          </button>
        </div>

        <div className="flex justify-center items-center mt-6">
        <p className="mb-0.5 ml-1 mr-2">Page:</p>
          {Array(endPage - startPage + 1).fill(null).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(startPage + index)}
              className={`px-4 py-1 mx-1 rounded-sm text-gray-800 ${currentPage === startPage + index ? "border border-gray-600 bg-gray-100" : "border border-gray-100"}`}
            >
              {startPage + index}
            </button>
          ))}
        </div>
      </div>

      <hr />

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {currentItems.map((history) => {
          const { guid, guid_device: guidDevice, value: img, datetime: time } = history;
          return (
            <Card
              key={guid}
              Content1={
                <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                  <img
                    src={`https://smartparking.pptik.id/data/data/${img}`}
                    alt={guidDevice}
                    className="w-full h-56 object-cover rounded-md mb-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg";
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-semibold text-gray-600">{guidDevice}</h2>
                    <p className="text-sm text-gray-600 flex items-center">
                      <ClockCounterClockwise size={17} color="#094462" weight="duotone" className="mr-0.5 mt-0.5"/>
                      {time}
                    </p>
                  </div>
                </div>
              }
            />
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onDateSelect={handleDateSelection} />
    </div>
  );
};

export default Banner;
