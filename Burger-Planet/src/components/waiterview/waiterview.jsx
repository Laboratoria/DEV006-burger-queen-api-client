// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para acceder al estado pasado en la navegación
import 'tailwindcss/tailwind.css'
import OrderTables from './tables.jsx';
import Logocara from '../logopequeño';
import WelcomeUser from '../adminview/welcome.jsx';

function WaiterView() {
    const location = useLocation(); // Obtiene la ubicación actual
    const { role, email } = location.state || {}; // Obtiene el estado pasado (si existe)
    const username = email ? email.split('@')[0] : '';
    return (
        <>
            <div className="min-w-full bg-DarkBlue">
                <Logocara />
                <WelcomeUser rol={role} user={username} />
                <OrderTables />
                <OrderTables />
            </div>
        </>
    )
}

export default WaiterView;