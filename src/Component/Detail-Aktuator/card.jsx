import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { MapPinArea, Broadcast, CalendarDots, ClockCounterClockwise } from "@phosphor-icons/react";

const Card = ({ type, guid_device, title, description, date, content, contenttable, buttonLabel, status }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap p-1 lg:space-y-0 lg:space-x-6">
      {/* Device Details Card */}
      <div className="w-full lg:w-2/3">
        <div className="p-5 px-6 bg-white rounded-xl shadow-md transition-all">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Broadcast size={50} color="#094462" weight="duotone" className="mr-4" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                  {title}
                  <span className={`ml-2 text-xs font-medium px-3 py-1 rounded-full ${status === "Aktif" ? "bg-blue-200 text-blue-500" : "bg-red-200 text-red-500"}`}>
                    {status}
                  </span>
                </h1>
                <p className="bg-gray-100 p-2 rounded-lg text-gray-500 text-xs hover:shadow-sm ">
                  Guid Perangkat | {description}
                </p>
              </div>
            </div>
            <Link
              to={`/history-perangkat/${type}/${guid_device}`}
              className="text-xs bg-blue-100 hover:bg-blue-400 text-blue-500 px-4 hover:text-white py-2 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-3">
            PETA LOKASI
            <MapPinArea size={30} color="#004D1F" weight="duotone" className="ml-2" />
          </h1>
          <hr />
          <div className="mt-4 hover:shadow-sm">{content}</div>
        </div>
      </div>

      {/* Registration and Last Data Section */}
      <div className="w-full lg:w-1/3">
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center mb-2">
            <CalendarDots size={24} color="#094462" weight="duotone" className="mr-1" />
            <span className="font-semibold">Tanggal Registrasi:</span>
          </div>
          <p className="bg-gray-100 p-2 rounded-lg text-gray-500 text-sm hover:shadow-sm">
            Registrasi Pada | {date}
          </p>
        </div>

        <div className="mt-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <div className="flex item-center">
            <ClockCounterClockwise size={24} color="#094462" weight="duotone" className="mr-1" />
            <h1 className="font-semibold text-gray-800 mb-2">
              Data Terakhir:
            </h1>
          </div>
          {contenttable}
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
  buttonLabel: PropTypes.string,
  status: PropTypes.string.isRequired,
};

export default Card;