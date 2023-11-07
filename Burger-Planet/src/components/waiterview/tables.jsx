/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'tailwindcss/tailwind.css';
import table from '../../assets/table.png';

function OrderTables(props) {
    const { label, selected } = props;
    const navigate = useNavigate(); // Obtén la función navigate

    const handleTableClick = () => {
        if (selected) {
            navigate(`/table/${label}`); // Usa navigate en lugar de history.push
        }
    };

    return (
        <div
            className={`flex justify-center items-center m-auto ${selected ? 'border-2 border-blue-500 cursor-pointer' : 'cursor-not-allowed'
                }`}
            onClick={handleTableClick}
        >
            <div
                className={`text-White w-38 h-38 flex flex-col items-center justify-center ${selected ? 'text-blue-500' : ''
                    }`}
            >
                <img src={table} alt="table" className="w-full h-full" />
                {label}
            </div>
        </div>
    );
}

export default OrderTables;
