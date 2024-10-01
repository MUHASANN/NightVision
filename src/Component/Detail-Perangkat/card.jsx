import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import backgroundImage from '../../asset/img.jpg';

const Carddetail = ({ guid_device, type, leftcard, leftcard2, centercard, rightcard, rightcard2, rightcard3 }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-3">
        <div className='w-full justify-center mr-24'>
          <div className="col-span-1 space-y-4 mr-2">
            <div className="transition-transform transform hover:scale-105">
              {leftcard2}
            </div>
            <div className="transition-transform transform hover:scale-105">
              {leftcard}
            </div>
          </div>
        </div>

        {/* Center section */}
        <div className="col-span-2 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div
              className="bg-cover bg-center bg-no-repeat rounded-lg w-[310px] h-[50px] text-white shadow-sm p-6"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              aria-label="Center card"
            >
              {centercard}
            </div>
            <Link
              to={`/history-perangkat/${type}/${guid_device}`}
              className="bg-purple-200 text-purple-500 py-2 px-6 shadow-sm border-blue-100 border-[1px] rounded-xl hover:bg-purple-300 transition-colors duration-300 ease-in-out transition-transform transform hover:scale-105"
              aria-label="View history"
            >
              Histori
            </Link>
          </div>

          <div className="grid grid-cols-2">
            <div className="bg-white p-5 rounded-lg h-[100px] shadow-sm  hover:shadow-md transition-colors duration-300 transition-transform transform hover:scale-105" aria-label="Right card 1">
              {rightcard}
            </div>
            <div className="bg-white p-5 ml-4 rounded-lg h-[100px]  hover:shadow-md transition-colors duration-300 shadow-sm transition-transform transform hover:scale-105" aria-label="Right card 2">
              {rightcard2}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg h-[420px] shadow-sm" aria-label="Right card 3">
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
