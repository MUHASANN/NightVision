import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import backgroundImage from '../../asset/img.jpg';

const Carddetail = ({ guid_device,type, leftcard, leftcard2, centercard, rightcard, rightcard2, rightcard3 }) => {
  return (
    <div className="flex justify-center p-10 bg-gray-200">

      <div className="grid grid-cols-1 md:grid-cols-1  mb-4">
        <div className="w-full md:w-1/1 p-2">
          <div className="bg-white p-4 rounded-lg shadow h-[320px] transition-transform transform hover:scale-105">
            {leftcard2}
          </div>
        </div>
        <div className="w-full md:w-1/1 p-2 mt-4"> {/* Added mt-4 for additional spacing */}
          <div className="bg-white p-4 rounded-lg shadow h-[320px] transition-transform transform hover:scale-105">
            {leftcard}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/3 p-2">
        <div className="flex items-center justify-between mb-4">
          <div
            className="bg-cover bg-center bg-no-repeat p-4 rounded-lg shadow w-[320px] h-[50px] text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {centercard}
          </div>
          <Link to={`/history-perangkat/${type}/${guid_device}`} className="bg-yellow-400 mr-2 mt-2 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-500 transition-colors duration-300 ease-in-out">
            History
          </Link>
        </div>

        <div className="w-full p-2 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow h-[100px] transition-transform transform hover:scale-105">
              {rightcard}
            </div>
            <div className="bg-white p-4 rounded-lg shadow h-[100px] transition-transform transform hover:scale-105">
              {rightcard2}
            </div>
          </div>
        </div>

        <div className="w-full p-2 mt-2">
          <div className="bg-white p-4 rounded-lg shadow h-[500px] transition-transform transform hover:scale-105">
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