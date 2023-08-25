// eslint-disable-next-line no-unused-vars
import React from 'react';
import logoPequeñoCara from '../assets/logocara.png';
import 'tailwindcss/tailwind.css';

function Logocara() {
    return (
        <div className="flex justify-center w-full h-full bg-DarkBlue">
            <img src={logoPequeñoCara} alt="logo" className="w-48 h-44 mt-12 " />
        </div>
    );
}


export default Logocara;