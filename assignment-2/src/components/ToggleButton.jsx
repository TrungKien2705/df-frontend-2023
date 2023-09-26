import React from 'react';
import '../styles/ToggleButton.css'
import {MdModeNight, MdOutlineLightMode} from "react-icons/md";
import {useTheme} from "../hook/useTheme";
const ToggleButton = () => {
    const {  theme, toggleTheme } = useTheme();
    return (
        <>
            <input onChange={toggleTheme} type="checkbox" className={`checkbox`} id="checkbox"/>
            <label  htmlFor="checkbox" className="checkbox-label">
                <MdModeNight color={` ${theme === 'light' ? "#fff" : "#000" }`}/>
                <MdOutlineLightMode color={` ${theme === 'light' ? "#fff" : "#000" }`}/>
                <span className="ball"></span>
            </label>
        </>
    );
};

export default ToggleButton;
