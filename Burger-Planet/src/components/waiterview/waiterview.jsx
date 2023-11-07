// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useLocation } from 'react-router-dom';
import OrderTables from './tables.jsx';
import Logocara from '../logopequeño';
import WelcomeUser from '../adminview/welcome.jsx';

function WaiterView() {
    const location = useLocation();
    const { role, email } = location.state || {};
    const username = email ? email.split('@')[0] : '';
    // const history = useHistory();

    const initialTables = [
        { label: 'Mesa 1', selected: false },
        { label: 'Mesa 2', selected: true },
        // Agrega más mesas si es necesario
    ];

    const [tables, setTables] = useState(initialTables);

    const handleTableClick = (index) => {
        const updatedTables = tables.map((table, i) =>
            i === index ? { ...table, selected: !table.selected } : table
        );
        setTables(updatedTables);
    };

    return (
        <>
            <div className="min-w-full bg-DarkBlue">
                <Logocara />
                <WelcomeUser rol={role} user={username} />
                {tables.map((table, index) => (
                    <OrderTables
                        key={index}
                        label={table.label}
                        selected={table.selected}
                        onClick={() => handleTableClick(index)}
                    />
                ))}
            </div>
        </>
    );
}

export default WaiterView;