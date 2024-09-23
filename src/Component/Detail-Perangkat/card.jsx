import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import backgroundImage from '../../asset/img.jpg';

const Carddetail = ({ guid_device, type, leftcard, leftcard2, centercard, rightcard, rightcard2, rightcard3 }) => {
  return (
    <div className="flex justify-center p-6 bg-gray-100">

      <div className="grid grid-cols-1 md:grid-cols-1">
        <div className="w-full md:w-1/1">
          <div className="p-2 transition-transform transform hover:scale-105">
            {leftcard2}
          </div>
        </div>
        <div className="w-full md:w-1/1">
          <div className="p-2 transition-transform transform hover:scale-105">
            {leftcard}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/3 p-2">
        <div className="flex items-center justify-between mb-2">
          <div
            className="bg-cover bg-center bg-no-repeat ml-2 p-6 rounded-lg w-[310px] h-[50px] text-white shadow-sm"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {centercard}
          </div>
          <Link to={`/history-perangkat/${type}/${guid_device}`} className="bg-purple-200 mr-2 mt-2 text-purple-500 py-2 px-6 shadow-sm border-blue-100 border-[1px] rounded-xl hover:bg-purple-300 transition-colors duration-300 ease-in-out transition-transform transform hover:scale-105">
            Histori
          </Link>
        </div>

        <div className="w-full p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-lg h-[100px] shadow-sm transition-transform transform hover:scale-105">
              {rightcard}
            </div>
            <div className="bg-white p-5 rounded-lg h-[100px] shadow-sm transition-transform transform hover:scale-105">
              {rightcard2}
            </div>
          </div>
        </div>

        <div className="w-full p-2">
          <div className="bg-white p-6 rounded-lg h-[430px] shadow-sm">
            {rightcard3}
          </div>
        </div>
      </div>
    </div>
  );
};

Carddetail.propTypes = {
  guid_device: PropTypes.string.isRequired,
  leftcard: PropTypes.node,
  leftcard2: PropTypes.node,
  centercard: PropTypes.node,
  rightcard: PropTypes.node,
  rightcard2: PropTypes.node,
  rightcard3: PropTypes.node,
};

export default Carddetail;