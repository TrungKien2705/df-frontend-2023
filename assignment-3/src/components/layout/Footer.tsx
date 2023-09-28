import React from "react";
import  "../../styles/Footer.css";

const Footer = () => (
    <footer className="footer">
        Copyright © 2023 |
        <a
            className="link-footer"
            rel="noopener noreferrer"
            href="https://github.com/TrungKien2705"
            target="_blank"
        >Nguyen Trung Kien</a
        >
        |
        <a
            className="link-footer"
            href="https://github.com/TrungKien2705/df-frontend-2023-assignment-3"
            target="_blank"
            rel="noopener noreferrer"
        >Source code</a
        >
    </footer>
);

export default Footer;