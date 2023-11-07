// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { requestLogin } from '../funtions/funtions';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import eyeOpen from '../../assets/eye-green.png';
import eyeClosed from '../../assets/closed-eyes-Green.png';

function InputLogin() {
    const [email, setEmail] = useState(''); // almacenar el valor del correo electrónico
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); //controlar la visibilidad de la contraseña
    const [errorMessage, setErrorMessage] = useState('');


    const togglePasswordVisibility = () => { // Función para alternar la visibilidad de la contraseña
        setShowPassword(!showPassword);
    };

    const handleInputChange = (event) => { // Función para manejar los cambios en los campos de entrada (correo electrónico y contraseña)
        const { name, value } = event.target;
        if (name === 'correo') {
            setEmail(value);
        } else if (name === 'contrasena') {
            setPassword(value);
        }
    };

    const navigate = useNavigate(); //navegación de React Router

    const handleSubmit = (event) => { // Función para manejar el envío del formulario (se ejecuta al hacer clic en "Iniciar Sesión")
        event.preventDefault();
        // Aquí puedes realizar acciones con el correo electrónico y la contraseña ingresados
        console.log('Correo electrónico:', email);
        console.log('Contraseña:', password);
    };

    const handleLogin = async (e) => { // Función para manejar el inicio de sesión
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Verifica que los campos no esten vacíos.');
            return;
        }

        try {
            const data = await requestLogin(email, password);  // Llamada a la función de inicio de sesión con el correo electrónico y contraseña proporcionados
            const { accessToken, user: { role } } = data;
            localStorage.setItem('token', accessToken); // Almacenamiento del token de acceso en el almacenamiento local del navegador
            localStorage.setItem('role', role); // Almacenamiento del rol del usuario en el almacenamiento local

            switch (role) {
                case 'admin':
                    navigate('/adminView');
                    break;
                case 'waiter':
                    navigate('/waiterview');
                    break;
                case 'chef':
                    navigate('/chefview');
                    break;
                default:
                    console.log('Default case');
                    break;
            }
        } catch (error) {
            console.log('Error:', error.message);
            // Comprobación del mensaje de error del servidor y manejo de casos específicos
            if (error.message === 'Credenciales no válidas') {
                setErrorMessage('Correo electrónico o contraseña no válidos.');
            } else {
                setErrorMessage('Ocurrió un error, verifica tus datos.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-White ">
            <div className="flex flex-col items-center text-3xl ">
                <label htmlFor="correo" className="text-left">
                    Correo electrónico:
                </label>
                <div className="w-4/5 flex justify-center pt-5">
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={email}
                        onChange={handleInputChange}
                        required
                        className="items-center bg-DarkBlue border-4 border-GreenLight rounded-3xl py-2 px-4 w-full h-20"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center text-3xl pt-9 text-White">
                <label htmlFor="contrasena" className="text-left">
                    Contraseña:
                </label>
                <div className="w-4/5 flex justify-center pt-5 pb-8">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="contrasena"
                        name="contrasena"
                        value={password}
                        onChange={handleInputChange}
                        required
                        className="text-left bg-DarkBlue border-4 bg-opacity-1 border-GreenLight rounded-3xl py-2 px-4 w-full h-20 pr-16" // Añadimos "pr-16" para dar espacio al botón dentro del input
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="focus:outline-none absolute right-4 top-1/2 transform -translate-y-1/2 mt-72 mr-24" // Añadimos estilos para posicionar el botón absolutamente dentro del input
                    >
                        <img
                            src={showPassword ? eyeClosed : eyeOpen}
                            alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            className="w-6 h-6" // Establecemos el tamaño de la imagen, ajusta según tus necesidades
                        />
                    </button>


                </div>
                {/* Show the error message in real-time */}
                {errorMessage && <div className="text-Pink">{errorMessage}</div>}
            </div>
            <button
                onClick={handleLogin}
                type="submit"
                className="text-3xl justify-center flex mx-64 mt-96 bg-GreenLight border-4 text-Black rounded-3xl py-4 px-4 shadow-lg w-2/5 h-20 stroke-15 stroke-GreenLight blur-12.5"
            >
                Iniciar Sesión
            </button>
        </form>
    );
}

export default InputLogin;
