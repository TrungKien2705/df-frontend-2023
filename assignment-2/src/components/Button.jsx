import React from 'react';
import '../styles/Button.css';
const Button = (props) => {
    const {lable, type, secondary, onClick, disabled, fullWidth, className} = props;
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                form-btn 
                ${className}
                ${fullWidth ? "w-full" : "w-fit"}
                ${secondary ? "bg-transparent" : "bg-pink"}
            `}
            onClick={onClick}
        >
            {lable}
        </button>
    );
};

export default Button;