import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { getDataHistoryCamera } from "../../Api/service/service";

const PlaceholderCard = () => (
  <div className="bg-gray-300 animate-pulse p-6 rounded-lg shadow-lg h-[250px]">
    <div className="bg-gray-100 h-[150px] rounded-lg mb-4"></div>
    <div className="bg-gray-100 h-[20px] rounded-lg mb-2"></div>
    <div className="bg-gray-100 h-[20px] rounded-lg"></div>
  </div>
);

const History = () => {
  const { guid_device } = useParams();
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataHistoryCamera(1, 20, guid_device);

        if (response && Array.isArray(response.data.data)) {
          setDeviceData(response.data.data);
        } else {
          setDeviceData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guid_device]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Card 
          isHeader={true} 
          title={guid_device} 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <PlaceholderCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (deviceData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="text-xl font-semibold">No data available</div>
      </div>
    );
  }

  const itemsPerPage = 8;
  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const currentItems = deviceData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-5 bg-gray-100 min-h-screen">

      <Card 
        isHeader={true} 
        title={guid_device} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentItems.map((card) => (
          <Card
            key={card.guid}
            image={card.value || notFoundImage}
            title={card.guid_device}
            description={card.datetime}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="bg-white shadow-sm text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 flex items-center transition-transform transform hover:scale-105"
        >
          <FaAngleLeft className="text-lg" />
          <span className="ml-2">Previous</span>
        </button>
        <span className="text-gray-800 font-semibold">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="bg-white shadow-sm text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 flex items-center transition-transform transform hover:scale-105"
        >
          <span className="mr-2">Next</span>
          <FaAngleRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default History;
