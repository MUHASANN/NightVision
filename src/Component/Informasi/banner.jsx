import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Landing/Navbar/navbar";
import BarChart from "../../Component/Informasi/datagram";
import { FaMapMarkedAlt } from "react-icons/fa";

const Banfi = () => {
  return (
    <div className="w-full h-[41em] bg-gray-200 relative">
      <Navbar />
      <div className="flex flex-col p-2">
        <header className="flex justify-between items-center p-3">
          <nav className="flex items-center justify-start font-semibold bg-white w-full max-w-auto h-[70px] shadow-md rounded-lg relative">
            <Link to="/Peta-Lokasi">
              <button className="bg-white text-gray-900 py-2 px-4 rounded-lg mx-2 hover:bg-gray-200 hover:text-gray-600 ml-4 transition-colors duration-300 ease-in-out flex items-center">
                PETA <FaMapMarkedAlt className="ml-2" />
              </button>
            </Link>
            <Link to="/Histori-infromasi">
              <button className="bg-white text-gray-900 py-2 px-4 rounded-lg mx-2 hover:bg-gray-200 hover:text-gray-600 transition-colors duration-300 ease-in-out">
                HISTORI
              </button>
            </Link>
          </nav>
        </header>
        <main className="flex justify-start items-center p-3">
          <div className="flex items-center justify-center font-semibold bg-gray-900 w-full max-w-[55em] h-[450px] shadow-md rounded-lg">
            <div className="w-[50em] h-[24em]">
              <BarChart />
            </div>
          </div>
          {/* <div className="ml-3 flex flex-col h-[435px] w-[25em] bg-white rounded-lg shadow-lg">
            <div className="sticky top-0 bg-white z-10 rounded-t-lg border-b border-gray-200">
              <div className="flex justify-between px-6 py-4">
                <h2 className="text-2xl font-semibold text-gray-800">Informasi Darurat</h2>
                <span className="text-sm text-gray-500">+ 10 lokasi</span>
              </div>
            </div>
            <ul className="list-disc list-inside p-4 overflow-y-auto scrollbar-hidden hover:scrollbar-custom">
              <li className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-gray-700 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Location 1</p>
                    <p className="text-sm text-gray-600">Deskripsi singkat tentang lokasi 1.</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </li>
            
            </ul>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default Banfi;
