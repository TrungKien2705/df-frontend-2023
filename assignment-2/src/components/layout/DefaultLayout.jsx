import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTheme} from "../../hook/useTheme";
const DefaultLayout = () => {
    const { theme } = useTheme();
    const updateThemeAttribute = () => {
        const bodyElement = document.querySelector('body');
        if (bodyElement) {
            bodyElement.setAttribute('data-theme', theme);
        }
    };
    useEffect(() => {
        updateThemeAttribute();
    }, [theme]);
    return (
        <>
        <Header/>
            <main className="container" data-theme={theme}>
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
            theme={theme}
        />
        </>
    );
};

export default DefaultLayout;