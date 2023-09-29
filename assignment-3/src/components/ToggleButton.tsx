import React from 'react';
import '../styles/ToggleButton.css'
import {MdModeNight, MdOutlineLightMode} from "react-icons/md";
import {useTheme} from "../hook/useTheme";
import Theme from "../types/theme";

const ToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <input onChange={toggleTheme} type="checkbox" className="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox" className="checkbox-label">
                <input type="checkbox" className="checkbox" id="checkbox" name="checkbox" />
                <MdModeNight color={` ${theme === Theme.LIGHT ? "#fff" : "#000" }`}/>
                <MdOutlineLightMode color={` ${theme === Theme.LIGHT ? "#fff" : "#000" }`}/>
                <span className="ball" />
            </label>
        </>
    );
};

export default ToggleButton;
