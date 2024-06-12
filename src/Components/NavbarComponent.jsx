import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Styles.css'; // Asegúrate de crear un archivo Navbar.css con los estilos que proporcionaste

const Navbar = () => {
    return (
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Inicio</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/datatable" className="navbar-link">Datatable</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
