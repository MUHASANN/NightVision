import React from "react";
import { Link } from "react-router-dom";
import BarChart from "./datagram";

const Banfi = () => {
  return (
    <div className="p-8 mt-16">
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Additional Information Section with Links */}
        <div className="lg:col-span-1 bg-white p-6 shadow-sm rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Informasi Tambahan</h2>
          <div className="space-y-4">
            <Link to="/Peta-Lokasi">
              <div className="bg-blue-100 mb-4 p-4 rounded-lg shadow-sm hover:bg-blue-200 transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-blue-800">Peta Lokasi</h3>
                <p className="text-gray-700">Klik untuk melihat peta lokasi perangkat.</p>
              </div>
            </Link>
            <Link to="/history">
              <div className="bg-green-100 p-4 rounded-lg shadow-sm hover:bg-green-200 transition duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-green-800">Histori Perangkat</h3>
                <p className="text-gray-700">Klik untuk melihat histori perangkat.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:col-span-2 bg-gray-900 p-8 shadow-sm rounded-lg">
          <h2 className="text-2xl text-white font-semibold mb-6">Data Diagram</h2>
          <div className="w-full h-[400px]">
            <BarChart />
          </div>
        </div>

        {/* <div className="lg:col-span-1 bg-white p-6 shadow-sm rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Laporan dari AI</h2>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto scrollbar-hidden hover:scrollbar-custom">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Lokasi {idx + 1}</h3>
                  <div
                    className={`w-3 h-3 ${
                      idx % 2 === 0 ? "bg-blue-500" : "bg-yellow-500"
                    } rounded-full`}
                  ></div>
                </div>
                <p className="text-gray-600">
                  Laporan otomatis dari AI tentang lokasi.
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="lg:col-span-2 bg-white p-6 shadow-sm rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Laporan dari Petugas</h2>
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto scrollbar-hidden hover:scrollbar-custom">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Lokasi {idx + 1}</h3>
                  <div
                    className={`w-3 h-3 ${
                      idx % 2 === 0 ? "bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  ></div>
                </div>
                <p className="text-gray-600">Laporan dari petugas untuk lokasi.</p>
              </div>
            ))}
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Banfi;
