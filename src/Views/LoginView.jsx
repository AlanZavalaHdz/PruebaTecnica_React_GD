import React, { useState } from 'react';
import '../Styles/Styles.css';
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError('');

        const loginUrl = 'http://api-test.michoacan.gob.mx/api/login';
        const loginParams = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(loginParams)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                // Aquí también guardamos el email en el almacenamiento local
                localStorage.setItem('email', email);
                navigate('/dashboard');
            } else {
                setError(`Autenticación fallida: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al conectar con la API');
        }
    };

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    };

    return (
        <div className="container_login">
            <div className='wrapper'>
                <form onSubmit={iniciarSesion}>
                    <h1>Iniciar Sesión</h1>
                    {error && <div className="error_message">{error}</div>}
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><FaRegUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input
                            type={mostrarContrasena ? 'text' : 'password'}
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div onClick={toggleMostrarContrasena} className='icon'>
                            {mostrarContrasena ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>
                    <div className="button_content">
                        <button type='submit'>Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginView;
