import React, { ChangeEvent, forwardRef  } from 'react';
import "../styles/Input.css";

interface InputProps {
    name: string,
    type: "text" | "search",
    label?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string,
    disabled?: boolean,
    errors?: {},
    onFocus?: () => void,
    onBlur?: () => void,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    name, type, label, value, onChange,
    placeholder, disabled, errors,
    onFocus,onBlur
}, ref) => {
    return (
        <div  className={type === "search" ? "" : "form-group"}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                className={type === "search" ? " form-input-search" : "border-input form-input" }
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={ref}
            />
            {errors && errors[name] && <small className='required'>{errors[name].message}</small>}
        </div>
    );
})

export default Input;
