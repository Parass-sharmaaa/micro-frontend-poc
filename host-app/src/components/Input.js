import React from 'react';
import './Input.css';

const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {
    return (
        <input
            className={`ds-input ${className}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default Input;
