import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ name, color, wide }) => (
  <button type="button" style={{ width: wide ? '50%' : '25%', background: color }}>
    { name }
  </button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  wide: PropTypes.bool,
};

Button.defaultProps = {
  wide: false,
  color: 'orange',
};

export default Button;
