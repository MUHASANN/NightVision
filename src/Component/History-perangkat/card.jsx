import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaClock, FaCameraRetro } from 'react-icons/fa';
import Modal from './modal';

const Card = ({ image, title, description, isHeader }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDateSelection = (start, end) => {
    const formattedStartDate = new Date(start).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedEndDate = new Date(end).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    handleCloseModal();
  };

  return (
    <div>
      {isHeader ? (
        <div className="bg-white text-white p-4 px-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaCameraRetro className="text-3xl text-gray-700 mr-3" />
              <h1 className="text-2xl text-gray-700 font-semibold">Histori Device {title}</h1>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-purple-100 px-2 py-1 rounded-lg text-purple-500 text-md border-blue-100 border-[1px] hover:bg-blue-100 hover:underline focus:outline-none"
              aria-label="Pilih Tanggal"
            >
              Pilih Tanggal
            </button>
          </div>
          <div className="flex justify-left items-center space-x-2 ">
            <p className="text-lg text-gray-700">Riwayat dan garis waktu aktivitas perangkat |</p>
            <div className="flex space-x-1 mt-[1.5px]">
              <p className="text-md text-gray-700">Tanggal Gambar : <span className="text-gray-400">{startDate || "None"} - </span></p>
              <p className="text-md"><span className="text-gray-400">{endDate || "None"}</span></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
          <img
            src={`https://smartparking.pptik.id/data/data/${image}`}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg";
            }}
          />
          <h2 className="text-xl text-start font-semibold">{title}</h2>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 flex items-center">
              <FaClock className="text-xs text-gray-700 mr-1" />
              {description}
            </p>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onDateSelect={handleDateSelection} />
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isHeader: PropTypes.bool,
};

export default Card;
