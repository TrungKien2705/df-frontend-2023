import React from 'react';
import '../styles/Loading.css';

interface LoadingProps {
    width: string
}
const Loading: React.FC<LoadingProps> = (props) => {
    const { width } = props
    return (
        <div className={`loading ${width}`} />
    );
};

export default Loading;