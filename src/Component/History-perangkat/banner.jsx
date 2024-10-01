import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { getDataHistoryType } from "../../Api/service/service";

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
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataHistoryType(1, 20, guid_device);

        if (response && Array.isArray(response.data.data)) {
          setDeviceData(response.data.data);
        } else {
          setDeviceData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guid_device]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <Card isHeader={true} title={guid_device} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <PlaceholderCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="text-xl font-semibold">{error}</div>
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

  const totalPages = Math.ceil(deviceData.length / itemsPerPage);

  const currentItems = deviceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderCards = currentItems.map((history) => {
    const guid = history.guid;
    const guidDevice = history.guid_device;
    const img = history.value;
    const time = history.datetime;

    return (
      <Card
        key={guid}
        image={img || "path/to/default/image.jpg"} // Fallback image // This Cards Image!!
        title={guidDevice}
        description={time}
      />
    );
  });

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <Card isHeader={true} title={guid_device} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"> {/* {This Hearder} */}
        {renderCards}
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-800 flex items-center transition duration-200"
          >
            <FaAngleLeft className="mr-2" />
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-800 flex items-center transition duration-200"
          >
            Next
            <FaAngleRight className="ml-2" />
          </button>
        </div>

        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md transition duration-200 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
