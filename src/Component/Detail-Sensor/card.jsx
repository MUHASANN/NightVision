import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { MdOutlineSensors } from "react-icons/md";

const Card = ({ type, guid_device, title, description, date, time, status, content, buttonLabel }) => {
  return (
    <>
      <div className="flex justify-center w-full p-2 ml-1 bg-white border-blue-500 rounded-xl mb-4 shadow-smbh">
       <h2 className="font-semibold text-lg text-gray-800 mt-[2px]">
        Detail Sensor
       </h2>
      </div>
    
    <div className="flex space-x-4">
      <div className="w-1/3 p-2">
        {/* Device Information Card */}
        <div className="p-8 bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105">
          <div className="flex items-center space-x-4 mb-4">
            <MdOutlineSensors className="text-blue-500 text-7xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
              <p className="text-gray-700 text-md">{description}</p>
              <p className="text-gray-500 text-sm">{date}</p>
              <p>
                <Link
                  to={`/history-perangkat/${type}/${guid_device}`}
                  className="text-xs text-blue-500 hover:text-blue-600 hover:underline underline-offset-2 transition"
                >
                  {buttonLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Status Table */}
        <div className="mt-6 p-8 bg-white rounded-lg shadow-sm transition-transform transform hover:scale-105">
          <div className="w-full">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Waktu</th>
                  <th className="py-3 px-4 text-sm text-right font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-gray-700">{time}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{status}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">{time}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 bg-white shadow-sm rounded-lg">
        <div className="flex items-end space-x-4">
          {content}
        </div>
      </div>
    </div>
    </>
  );
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
  guid_device: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string,
};

export default Card;
