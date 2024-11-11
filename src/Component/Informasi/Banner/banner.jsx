import React, { useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "./datagram";

const Banfi = () => {
  const [activeTab, setActiveTab] = useState("statistik");

  return (
    <div className="p-8 mt-16 bg-slate-100 min-h-screen text-gray-900">
      {/* Header Section */}
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Informasi IoT Station</h1>
        <div className="flex space-x-2">
          <Link
            to="/Peta-Lokasi"
            className="bg-gradient-to-r from-green-500 to-green-600 text-sm text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-80 transition-all duration-300 ease-in-out"
          >
            Peta Lokasi
          </Link>
          <Link
            to="/history"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-sm text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-80 transition-all duration-300 ease-in-out"
          >
            Camera
          </Link>
        </div>
      </div>

      {/* Tab Section */}
      <div className="mb-8">
        <div className="flex border-b border-gray-400 space-x-4 transition-all">
          <button
            onClick={() => setActiveTab("statistik")}
            className={`py-2 px-4 text-md font-semibold ${
              activeTab === "statistik"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Statistik Diagram
          </button>
          <button
            onClick={() => setActiveTab("laporan-petugas")}
            className={`py-2 px-4 text-md font-semibold ${
              activeTab === "laporan-petugas"
                ? "border-b-2 border-[#3B82F6] text-[#3B82F6]"
                : "text-gray-600"
            }`}
          >
            Laporan Petugas
          </button>
          <button
            onClick={() => setActiveTab("laporan-ai")}
            className={`py-2 px-4 text-md font-semibold ${
              activeTab === "laporan-ai"
                ? "border-b-2 border-[#3B82F6] text-[#3B82F6]"
                : "text-gray-600"
            }`}
          >
            Laporan AI
          </button>
        </div>

        {/* Content Sections */}
        <div className="mt-6">
          {activeTab === "statistik" && (
            <div className="p-2 mt-4">
              <div className="w-full bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all mb-12">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
                  Data Bulanan
                </h2>
                <div className="w-full h-[20em] flex justify-center items-center mt-10">
                  <BarChart title="Diagram Bulan" />
                </div>
              </div>

              <div className="w-full bg-white rounded-md shadow-lg p-8 hover:shadow-lg transition-all">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
                  Data Tahunan
                </h2>
                <div className="w-full h-[20em] flex justify-center items-center mt-10">
                  <BarChart title="Diagram Tahun" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "laporan-petugas" && (
            <div className="p-2">
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-300 shadow-lg rounded-lg p-4"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Lokasi {idx + 1}
                    </h3>
                    <p className="text-gray-600">
                      Laporan dari petugas untuk lokasi {idx + 1}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "laporan-ai" && (
            <div className="p-2">
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-300 shadow-lg rounded-lg p-4"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      Lokasi {idx + 1}
                    </h3>
                    <p className="text-gray-600">
                      Laporan otomatis dari AI tentang lokasi {idx + 1}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banfi;
