import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import { getDataHistoryType, getDataDeviceByGuid } from "../../Api/service/service";
import { ClockCounterClockwise, CalendarDots } from "@phosphor-icons/react";
import Modal from "./modal";
import 'ldrs/tailspin';

const Banner = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState({});
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [message, setMessage] = useState(null);
  const itemsPerPage = 12;

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDateSelection = (start, end) => {
    if (start && end) {
      const formattedStartDate = new Date(start).toLocaleDateString('id-ID');
      const formattedEndDate = new Date(end).toLocaleDateString('id-ID');
      setSelectedDateRange(`${formattedStartDate} - ${formattedEndDate}`);
      fetchData(start, end);
    } else {
      setSelectedDateRange(null);
      fetchData();
    }
    handleCloseModal();
  };

  const fetchData = async (startDate = "2024-09-01", endDate = "2024-09-30") => {
    setIsLoading(true);
    setMessage(null);
    setError(null);
    try {
      const deviceResponse = await getDataDeviceByGuid(guid_device);
      setDeviceData(deviceResponse.data);
      const historyResponse = await getDataHistoryType(1, 1000, guid_device, startDate, endDate);
      const history = historyResponse?.data?.data || [];
      setHistoryData(history);
      if (history.length === 0) {
        setMessage("No images found for the selected date range.");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [guid_device]);

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const paginationRange = 2;
  const startPage = Math.max(1, currentPage - paginationRange);
  const endPage = Math.min(totalPages, currentPage + paginationRange);
  const paginationButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const currentItems = historyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-slate-100 min-h-screen w-full p-0 m-0">
      <div className="p-6">
        <div className="bg-white shadow-md p-2 rounded-lg hover:shadow-sm transition duration-300 mb-4">
          <div className="flex justify-center items-center mb-2">
            <h1 className="mt-4 text-2xl font-bold text-gray-800">{deviceData.name || "Device Name"}</h1>
          </div>
          <div className="flex justify-center">
            <span className="mb-4 text-md text-gray-500 font-semibold">
              Riwayat/Histori pengambilan gambar dan informasi waktu pada perangkat.
            </span>
          </div>
        </div>

        <div className="flex justify-between mb-1 p-2">
          <div className="flex items-center">
            <button
              onClick={handleOpenModal}
              className="bg-white shadow-md text-md text-gray-500 text-sm p-2 px-4 rounded-lg transition duration-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Pilih Tanggal"
            >
              <div className="flex">
                <CalendarDots size={21} weight="duotone" className="mr-1" />
                {selectedDateRange || "Pilih Tanggal.."}
              </div>
            </button>
          </div>

          <div className="flex items-center justify-center my-2">
            {startPage > 1 && (
              <button
                onClick={() => setCurrentPage(startPage - 1)}
                className="px-3 py-1 mx-1 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-200 transition duration-300"
              >
                Prev
              </button>
            )}

            {paginationButtons.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 mx-1 rounded-lg border border-gray-300 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-200 transition duration-300"
                }`}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <button
                onClick={() => setCurrentPage(endPage + 1)}
                className="px-3 py-1 mx-1 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-200 transition duration-300"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {message && <p className="text-center text-gray-500 mt-48">{message}</p>}

        {isLoading ? (
          <div className="flex justify-center items-center mt-48">
            <l-tailspin
              size="50"
              stroke="5"
              speed="0.9"
              color="gray"
            ></l-tailspin>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {currentItems.map((history) => (
              <Card
                key={history.guid}
                Content1={
                  <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <img
                      src={`https://smartparking.pptik.id/data/data/${history.value}`}
                      alt={history.guid_device}
                      className="w-full h-56 object-cover rounded-md mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://cctv-tnwk.pptik.id/images/no-image.png";
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-semibold text-gray-600">{history.guid_device}</h2>
                      <p className="text-sm text-gray-600 flex items-center">
                        <ClockCounterClockwise size={17} color="#094462" weight="duotone" className="mr-0.5 mt-0.5" />
                        {history.datetime}
                      </p>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onDateSelect={handleDateSelection} />
      </div>
    </div>
  );
};

export default Banner;