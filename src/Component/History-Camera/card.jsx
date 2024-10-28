import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ Content1 }) => {
  return (
    <div className="relative p-2">
      <div>
        {Content1}
      </div>
    </div>
  );
};

Card.propTypes = {
  Content1: PropTypes.node.isRequired,
};

export default Card;
 