import React, { useState, useEffect } from "react";
import Card from "./card";
import { FaSearch, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { getDataDeviceByCompany, getDataDevice } from "../../Api/service/service";
import Radio from '@mui/material/Radio';
import CircularProgress from '@mui/material/CircularProgress';

const ITEMS_PER_PAGE = 8;
const CATEGORIES = ["Camera", "Sensor", "Aktuator"];

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Camera");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    getData();
  }, [selectedCategory]);

  useEffect(() => {
    filterData();
  }, [searchTerm, data]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await (CATEGORIES.includes(selectedCategory)
        ? getDataDevice(selectedCategory)
        : getDataDeviceByCompany());

      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    const filtered = searchTerm
      ? data.filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data;

    setFilteredData(filtered);
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
  const currentCards = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const controlProps = (item) => ({
    checked: selectedCategory === item,
    onChange: () => {
      setSelectedCategory(item);
      setCurrentPage(1);
    },
    value: item,
    name: "category",
    inputProps: { "aria-label": item },
  });

  return (
    <div className="bg-slate-100 min-h-screen w-full p-0 m-0">
      <div className="p-6 mt-16">

        <div className="bg-white rounded-lg shadow-lg border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div className="relative mt-4 md:mt-0 md:w-2/5">
            <input
              type="text"
              placeholder="Cari nama perangkat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-400 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Radio buttons with custom colors */}
          <div className="flex mr-4 space-x-4">
            <div className="flex item-center font-medium">
              <Radio {...controlProps('Camera')} color="primary"/>
              <p className="mt-2 text-gray-600">Camera</p>
            </div>
            <div className="flex item-center font-medium">
              <Radio {...controlProps('Sensor')} color="error"/>
              <p className="mt-2 text-gray-600">Sensor</p>
            </div>
            < div className="flex item-center font-medium">
              <Radio {...controlProps('Aktuator')} color="success"/>
              <p className="mt-2 text-gray-600">Aktuator</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {loading ? (
            <div className="flex justify-center items-center w-full col-span-4">
              <CircularProgress />
            </div>
          ) : currentCards.length > 0 ? (
            currentCards.map((card) => (
              <Card
                key={card.guid}
                guid_device={card.deviceGuid}
                type={card.type}
                title={card.name}
                description={card.deviceGuid}
                className="shadow-lg w-full h-64 bg-white rounded-lg p-4 flex flex-col justify-between"
              />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-600">
              No devices found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePreviousPage}
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
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-800 flex items-center transition duration-200"
            >
              Next
              <FaAngleRight className="ml-2" />
            </button>
          </div>

          {/* Page Number Buttons */}
          <div className="flex space-x-2">
            {totalPages > 4 && currentPage > 3 && (
              <span className="px-3 py-1">...</span>
            )}
            {[...Array(Math.min(totalPages, 4))].map((_, index) => {
              const pageIndex = index + Math.max(0, currentPage - 3);
              if (pageIndex < totalPages) {
                return (
                  <button
                    key={pageIndex}
                    onClick={() => setCurrentPage(pageIndex + 1)}
                    className={`px-3 py-1 rounded-md transition duration-200 ${
                      currentPage === pageIndex + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                );
              }
              return null;
            })}
            {totalPages > 4 && currentPage < totalPages - 2 && (
              <span className="px-3 py-1">...</span>
            )}
            {totalPages > 4 && currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded-md transition duration-200 ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;