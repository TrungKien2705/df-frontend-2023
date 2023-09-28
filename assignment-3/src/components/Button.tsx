import React, {ReactNode} from 'react';
import '../styles/Button.css';

interface ButtonProps{
    label: string | ReactNode;
    type?: "button" | "submit" | "reset" | undefined,
    secondary: boolean,
    fullWidth: boolean,
    disabled?: boolean,
    className?: string,
    onClick?: () => void
}
const Button: React.FC<ButtonProps> = (props) => {
    const {label, type, secondary, onClick, disabled, fullWidth, className} = props;
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
            {label}
        </button>
    );
};

export default Button;