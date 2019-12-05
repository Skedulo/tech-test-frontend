import React from 'react';
import './InputBase.css';

export const InputBase = ({
  className = '',
  type,
  value,
  onChange,
  onKeyDown,
  ...props
}) => (
  <input
    {...props}
    className={`${className} input-base`}
    type={type}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  ></input>
);
