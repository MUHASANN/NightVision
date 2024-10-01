import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineSensors } from "react-icons/md";

const Card = ({ type, guid_device, title, description, date, content, contenttable, buttonLabel }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap p-4 space-y-4 lg:space-y-0 lg:space-x-6">
      {/* Device Details Card */}
      <div className="w-full lg:w-1/3">
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          <div className="flex items-center space-x-4 mb-4">
            <MdOutlineSensors className="text-blue-500 text-7xl" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
              <p className="text-gray-500 text-xs">Registrasi | {date}</p>
              <p className="text-gray-500 text-xs">Guid | {description}</p>
              <p>
                <Link
                  to={`/history-perangkat/${type}/${guid_device}`}
                  className="text-xs text-blue-600 hover:text-blue-700 underline transition-all"
                >
                  {buttonLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
          <h1 className="mb-6 font-semibold text-gray-800">Data Terakhir</h1>
          {contenttable}
        </div>
      </div>

      {/* Map Location Card */}
      <div className="w-full lg:w-[48.5em]">
        <h1 className="mb-4 mt-2 text-xl font-bold flex items-center text-gray-800">
          PETA LOKASI
          <PiMapPinArea className="ml-2 mt-[1px] text-2xl text-green-600" />
        </h1>
        <div className="flex-1 p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
          <div className="flex items-end space-x-6">
            {content}
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
  buttonLabel: PropTypes.string,
};

export default Card;
