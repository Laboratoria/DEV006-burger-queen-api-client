// eslint-disable-next-line no-unused-vars
import React from 'react';
import logoFondo from '../../assets/logoFondo.png'; // Corregimos la ruta de la imagen
import 'tailwindcss/tailwind.css';

function LogoLogin() { // Corregimos el nombre del componente a LogoHome
    return (
        <div className="flex justify-center w-full h-full bg-DarkBlue">
            <img src={logoFondo} alt="logo" className="w-90 h-90 " />
        </div>
    );
}


export default LogoLogin;