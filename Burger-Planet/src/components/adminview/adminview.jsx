// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoLetters from './logoCaraLetras.jsx'
import AdminButtons from './buttonAdmin.jsx';
import WelcomeUser from './welcome.jsx';
import 'tailwindcss/tailwind.css'

function AdminHome() {
    const location = useLocation(); // Obtiene la ubicación actual
    const { role, email } = location.state || {}; // Obtiene el estado pasado (si existe)
    const username = email ? email.split('@')[0] : '';  // Extrae la parte izquierda del correo electrónico
    return (
        <>
            <div className="min-w-full bg-DarkBlue pt-12">
                <LogoLetters />
                <WelcomeUser rol={role} user={username} />
                <AdminButtons />
            </div>
        </>
    )
}

export default AdminHome;