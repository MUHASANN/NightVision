import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FcCamera, FcElectricalSensor, FcServices } from "react-icons/fc";

const Card = ({ guid_device, type, title, description, highlighted = false, onClick }) => {
  
  const renderIcon = () => {
    switch (type) {
      case "Camera":
        return <FcCamera className="text-gray-100 text-2xl mr-1 transition-transform duration-300 hover:scale-125" />;
      case "Sensor":
        return <FcElectricalSensor className="text-gray-100 text-2xl mr-1 transition-transform duration-300 hover:scale-125" />;
      case "Aktuator":
        return <FcServices className="text-gray-100 text-2xl mr-1 transition-transform duration-300 hover:scale-125" />;
      default:
        return null;
    }
  };

  return (
    <Link 
      to={`/detail-perangkat/${type}/${guid_device}`} 
      onClick={onClick} 
      className={`card relative p-8 border rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out 
      ${highlighted ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'}`}
    >
      <div className="mb-2">
          <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <div className="flex item-center">
          {renderIcon()}
          <p className="text-black mb-4">{description}</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  guid_device: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  highlighted: PropTypes.bool,
};

export default Card;
