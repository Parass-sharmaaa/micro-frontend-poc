import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) => {
    return (
        <button
            className={`ds-button ds-button-${variant} ds-button-${size} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
