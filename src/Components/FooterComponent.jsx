// Footer.js
import React from 'react';
import '../Styles/Styles.css';

const Footer = () => {
    return (
        <div className="footer">
            <ul className="footer-list">
                <li className="footer-item">
                    <p className="footer-text">
                        © {new Date().getFullYear()} Alan Felipe Zavala Hernández
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
