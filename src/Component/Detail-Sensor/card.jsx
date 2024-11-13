import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MapPinArea, Broadcast, CalendarDots, ClockCounterClockwise, Info } from "@phosphor-icons/react";

const Card = ({ type, guid_device, title, description, date, content, contenttable, status }) => {
  return (
    <div className="bg-slate-100 w-full p-10 mt-16">
      <div className="flex flex-wrap lg:flex-nowrap gap-6">

        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="py-4 px-6 bg-white rounded-lg shadow-lg transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Broadcast size={48} color="#094462" weight="duotone" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 ml-1">{title}</h1>
                  <p className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">Guid Perangkat | {description}</p>
                </div>
              </div>
              <Link
                to={`/history-perangkat/${type}/${guid_device}`}
                className="text-xs bg-blue-100 hover:bg-blue-400 text-blue-500 hover:text-white px-4 py-2 rounded-full transition-all transform hover:scale-105"
                aria-label="View history"
              >
                Lihat histori...
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg transition-all hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              PETA LOKASI
              <MapPinArea size={28} color="#004D1F" weight="duotone" className="ml-2" />
            </h2>
            <hr className="my-2" />
            <div className="mt-4">{content}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Info size={22} color="#094462" weight="duotone" />
                <span className="font-semibold text-gray-800">Status Perangkat</span>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${status === "Aktif" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-center space-x-2">
              <CalendarDots size={22} color="#094462" weight="duotone" />
              <span className="font-semibold text-gray-800">Tanggal Registrasi:</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">{date}</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
            <div className="flex items-center space-x-2">
              <ClockCounterClockwise size={22} color="#094462" weight="duotone" />
              <h3 className="font-semibold text-gray-800">Data Terakhir:</h3>
            </div>
            <div className="mt-2">{contenttable}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
  guid_device: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contenttable: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
};

export default Card;
