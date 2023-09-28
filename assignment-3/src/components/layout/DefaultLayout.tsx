import React, {useCallback, useEffect, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Header";
import Footer from "./Footer";
import 'react-toastify/dist/ReactToastify.css';
import {useTheme} from "../../hook/useTheme";

const DefaultLayout = () => {
    const { theme } = useTheme();
    const updateThemeAttribute = useCallback(() => {
        const bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.setAttribute('data-theme', theme);
        }
    }, [theme]);
    const toastTheme = useMemo(() => {
        return theme === 'light' ? 'light' : 'dark';
    }, [theme]);
    useEffect(() => {
        updateThemeAttribute();
    }, [theme, updateThemeAttribute]);
    return (
        <>
            <Header/>
            <main className="container" >
                <Outlet/>
            </main>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={toastTheme}
            />
        </>
    );
};

export default DefaultLayout;