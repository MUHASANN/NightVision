import React from "react";
import PropTypes from "prop-types";

const Card = ({ image, title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={`https://smartparking.pptik.id/data/data/${image}`}
        alt={title}
        className="w-full h-[200px] object-cover rounded-lg mb-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://monitoring.pptik.id/data/RFIDCAM/no_image.jpg";
        }}
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-md text-gray-600">{description}</p>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
