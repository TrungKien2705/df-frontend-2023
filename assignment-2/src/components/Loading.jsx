import React from 'react';
import '../styles/Loading.css';
const Loading = (props) => {
    const { width } = props
    return (
        <div className={`loading ${width}`}></div>
    );
};

export default Loading;