import React, { useState, useEffect } from "react";
import Card from "./card";
import { FaSearch, FaDesktop, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { getDataDeviceByCompany } from "../../Api/service/service";

const ITEMS_PER_PAGE = 4;
const CATEGORIES = ["Camera", "Sensor", "Aktuator"];

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Camera");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data setiap kali kategori berubah
    getData();
  }, [selectedCategory]);

  useEffect(() => {
    // Filter data setiap kali search term atau data berubah
    filterData();
  }, [searchTerm, data]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getDataDeviceByCompany(selectedCategory);
      setData(response.data); // Simpan data asli
      setFilteredData(response.data)
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = data;

    // Filter berdasarkan kategori
    // if (selectedCategory) {
    //   filtered = data.filter((card) => card.category === selectedCategory);
    // }

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

  return (
    <div className="p-4 mt-2 w-full h-full bg-gray-200">
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xmd flex items-center">
          <FaDesktop className="text-blue-900 w-[50px] h-[50px] ml-3 mb-1" />
          <span className="ml-4 mb-1 text-[25px] text-gray-700 font-semibold hover:text-gray-500">
            PERANGKAT
          </span>
          <div className="ml-2 mr-2">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-400 rounded-lg"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          </div>
          <div className="relative ml-[32em] top-2 w-[350px]">
            <input
              type="text"
              placeholder="Cari nama perangkat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 border border-gray-400 rounded-lg w-full"
            />
            <FaSearch className="absolute right-3 top-1/3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 bg-white p-6 mt-6 rounded-lg shadow-md">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="p-6 bg-gray-300 custom-pulse rounded-lg flex flex-col space-y-3"
              >
                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/2"></div>
                <div className="h-8 bg-gray-400 rounded w-1/3"></div>
              </div>
            ))
          : currentCards.map((card) => (
              <Card
                key={card.guid}
                guid_device={card.deviceGuid}
                type={card.type}
                title={card.name}
                description={card.deviceGuid}
                buttonLabel="View"
              />
            ))}
      </div>
      <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-200"
        >
          <div className="flex justify-between items-center">
            <FaAngleLeft className="text-lg text-gray-700" />
            <span className="ml-2">Previous</span>
          </div>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-200"
        >
          <div className="flex justify-between items-center">
            <span className="mr-2">Next</span>
            <FaAngleRight className="text-lg text-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Banner;













// import React, { useState, useEffect } from "react";
// import Card from "./card";
// import { FaSearch, FaDesktop, FaAngleRight, FaAngleLeft } from "react-icons/fa";
// import {
//   getDataDevice,
//   getDataDeviceByCompany,
// } from "../../Api/service/service";

// const ITEMS_PER_PAGE = 4;
// const CATEGORIES = ["Camera", "Sensor", "Akuator"];

// const Banner = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("Camera");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     filterData();
//   }, [searchTerm, selectedCategory, data]);

//   const getData = async () => {
//     try {
//       console.log(selectedCategory);
//       const response = await getDataDeviceByCompany(selectedCategory);
//       setData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterData = () => {
//     let filtered = data;

//     if (selectedCategory !== "Camera") {
//       filtered = filtered.filter((card) => card.category === selectedCategory); // Adjust property as needed
//     }
//     if (selectedCategory !== "Aktuator") {
//       filtered = filtered.filter((card) => card.category === selectedCategory); // Adjust property as needed
//     }
//     if (selectedCategory !== "Sensor") {
//       filtered = filtered.filter((card) => card.category === selectedCategory); // Adjust property as needed
//     }
//     if (searchTerm) {
//       filtered = filtered.filter((card) =>
//         card.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredData(filtered);
//   };

//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData.length);
//   const currentCards = filteredData.slice(startIndex, endIndex);
//   console.log(currentCards);

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   return (
//     <div className="p-6 mt-4 w-full h-full bg-gray-200">
//       <div className="flex justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xmd flex items-center">
//           <FaDesktop className="text-blue-900 w-[50px] h-[50px] ml-3 mb-1" />
//           <span className="ml-4 mb-1 text-[25px] text-gray-700 font-semibold hover:text-gray-500">
//             PERANGKAT
//           </span>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="ml-4 p-2 border border-gray-400 rounded-lg"
//             onClick={getData()}
//           >
//             {CATEGORIES.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <div className="relative ml-[30em] top-3 w-[500px]">
//             <input
//               type="text"
//               placeholder="Cari nama perangkat..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="mb-4 p-2 border border-gray-400 rounded-lg w-full"
//             />
//             <FaSearch className="absolute right-3 top-1/3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 bg-white p-6 mt-6 rounded-lg shadow-md">
//         {loading
//           ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
//               <div
//                 key={index}
//                 className="p-6 bg-gray-300 custom-pulse rounded-lg flex flex-col space-y-3"
//               >
//                 <div className="h-6 bg-gray-400 rounded w-3/4"></div>
//                 <div className="h-5 bg-gray-400 rounded w-1/2"></div>
//                 <div className="h-8 bg-gray-400 rounded w-1/3"></div>
//               </div>
//             ))
//           : currentCards.map((card) => (
//               <Card
//                 key={card.guid}
//                 guid_device={card.deviceGuid}
//                 type={card.type}
//                 title={card.name}
//                 description={card.deviceGuid}
//                 buttonLabel="View"
//               />
//             ))}
//       </div>
//       <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-lg shadow-md">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-200"
//         >
//           <div className="flex justify-between items-center">
//             <FaAngleLeft className="text-lg text-gray-700" />
//             <span className="ml-2">Previous</span>
//           </div>
//         </button>
//         <span className="text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-200"
//         >
//           <div className="flex justify-between items-center">
//             <span className="mr-2">Next</span>
//             <FaAngleRight className="text-lg text-gray-700" />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;
