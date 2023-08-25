/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import 'tailwindcss/tailwind.css';
import table from '../../assets/table.png';

function OrderTables() {

    return (
        <div
            className={`flex justify-center items-center m-auto 'border-2 border-blue-500 cursor-pointer' : 'cursor-not-allowed'
                }`}
        >
            <div
                className={`text-White w-38 h-38 flex flex-col items-center justify-center 'text-blue-500' : ''
                    }`}
            >
                <img src={table} alt="table" className="w-full h-full" />
            mesa 1
            </div>
        </div>
    );
}

export default OrderTables;
