import React, { useState, useEffect } from 'react';
import '../Styles/Styles.css';
import { useNavigate } from 'react-router-dom';

function DashboardView() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('Invitado');

    useEffect(() => {
        // Obtener el email directamente del almacenamiento local donde se guardó durante el login
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    const irADataTable = () => {
        navigate('/datatable', { replace: false });
        localStorage.removeItem('email');
    };

    return (
        <div className="container_dashboard">
            <div className='dashboard'>
                <h1>Bienvenido</h1>
                <h2>{email}</h2>
                <button onClick={irADataTable}>Ir a DataTable</button>
            </div>
        </div>
    );
}

export default DashboardView;
