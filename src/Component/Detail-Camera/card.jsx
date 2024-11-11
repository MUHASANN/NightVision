import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapPinArea } from '@phosphor-icons/react';

const Carddetail = ({ guid_device, type, leftcard, leftcard2, rightcard, rightcard2, rightcard3 }) => {
  return (
    <div className="bg-slate-100 w-full p-0 m-0">
      <div className="mt-2 flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 ml-[-3em] mr-[-4em] space-y-[-1.5em]">
          <div className="transition-all transform hover:scale-105 p-6">
            {leftcard2}
          </div>
          <div className="transition-all transform hover:scale-105 p-6">
            {leftcard}
          </div>
        </div>

      {/* Right Section */}
      <div className="w-full lg:w-3/4 space-y-4 mr-10 mt-7">
        <div className='flex justify-between bg-white rounded-lg transition-all shadow-md hover:shadow-sm p-4'>
            <h3 className='font-semibold text-lg text-gray-900 mt-0.5'>Histori Data Camera</h3>
              <Link
                to={`/history-perangkat/${type}/${guid_device}`}
                className="text-xs bg-blue-100 hover:bg-blue-400 text-blue-500 hover:text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                aria-label="View history"
              >
                Lihat histori...
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="w-full bg-white rounded-lg h-[6em] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-between p-4">
              <div className="flex-1">{rightcard}
              </div>
            </div>
            <div className="w-full bg-white rounded-lg h-[6em] shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 p-4">
              {rightcard2}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-sm p-6 transition-all duration-300 ease-in-out">
            <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-3">
              PETA LOKASI
              <MapPinArea size={30} color="#004D1F" weight="duotone" className="ml-2" />
            </h1>
            <hr className="mb-4" />
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
  rightcard: PropTypes.node,
  rightcard2: PropTypes.node,
  rightcard3: PropTypes.node,
};

export default Carddetail;