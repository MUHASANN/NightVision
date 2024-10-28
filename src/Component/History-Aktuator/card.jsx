import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ Content1, Content2, CardContent3 }) => {
  return (
    <div className='relative p-3'>
      <div>
        <div className="mb-4">
          {Content1}
        </div>
      </div>

      <div className="relative bg-white p-8 rounded-lg shadow-md">
        <div>
          {Content2}
          {CardContent3}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  Content1: PropTypes.node,
  Content2: PropTypes.node,
  CardContent3: PropTypes.node,
};

export default Card;
