import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onDateSelect }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateSelect(startDate, endDate);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute text-2xl top-1 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h1 className="text-2xl text-blue-900 font-bold mb-2 text-center">IoT Station</h1>
        <p className="text-xs text-gray-700 font-semibold mb-8 text-center underline underline-offset-8">Pilih dan Input Untuk Mencari Tau Tanggal Riwayat !</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="start-date" className="block text-gray-700 mb-2">
              Tanggal Awal
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border bg-gray-200 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end-date" className="block text-gray-700 mb-2">
              Tanggal Akhir
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border bg-gray-200 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end items-center mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Oke!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func.isRequired,
};

export default Modal;
