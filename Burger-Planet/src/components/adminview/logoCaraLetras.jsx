// eslint-disable-next-line no-unused-vars
import React from 'react';
import logoCara from '../../assets/logoCaraLetras.png'; // Corregimos la ruta de la imagen
import 'tailwindcss/tailwind.css';

function LogoLetters() { // Corregimos el nombre del componente a LogoHome
    return (
        <div className="flex justify-center w-full h-full bg-DarkBlue">
            <img src={logoCara} alt="logoletra" className="w-90 h-90 " />
        </div>
    );
}


export default LogoLetters;