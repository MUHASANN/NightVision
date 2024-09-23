import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaWhmcs } from "react-icons/fa";

const Card = ({ guid_device,type, title, description, buttonLabel, highlighted = false, onButtonClick }) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className={`card p-8 bg-gray-600 border rounded shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out ${highlighted ? 'bg-yellow-100' : ''}`}>
      <div className="flex items-center mb-2">
        <FaWhmcs className="text-gray-100 mr-2 w-4 h-4" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-100 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/detail-perangkat/${type}/${guid_device}`}
          onClick={handleButtonClick}
          className="px-10 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center
          absolute bottom-3 right-4"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  guid_device: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  highlighted: PropTypes.bool,
};

export default Card;
