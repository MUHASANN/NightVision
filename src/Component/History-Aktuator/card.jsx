import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ Content1, CardContent3 }) => {
  return (
    <div className="relative p-10">
      {Content1}
      {CardContent3}
  </div>
  );
};

Card.propTypes = {
  Content1: PropTypes.node,
  CardContent3: PropTypes.node,
};

export default Card;
