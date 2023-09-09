import React from "react";
import { login } from "./functions.js";
import "./Form.css"
import { useState }  from "react";
import bqlogo from '../assets/img/bqlogo.png'


export function Form({setUser}) {
    const [correo, setCorreo] = useState("grace.hopper@systers.xyz")
    const [contraseña, setContraseña] = useState("123456")
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(correo === "" || contraseña === "") {
            setError(true)
            alert("Debe ingresar un usuario y contraseña")
            return
        }
        
        login(correo, contraseña)
        .then((res) => {
        setError(false)
        
        setUser({ 
            token: res.accessToken,
            user: res.user,
            })
        })
        .catch((err)=>{
            console.log(err)
            alert("Correo o contraseña incorrectos")
        })
        
    }

    return (
        <section className="loginAll">
            <div className="imgDivLogo">
                <img style={{ width: 200, height: 200 }} src={bqlogo} alt="BQ-logo" className="logo" />
            </div>           
            
            <form 
                className= "formLogin"
                onSubmit={handleSubmit}
            >
                <input className="inputEmail"
                type="email"
                value={correo}
                onChange= {e => setCorreo(e.target.value)}
                />
                <input className="inputEmail"  type="password"
                value={contraseña}
                onChange= {e => setContraseña(e.target.value)}
                />

            
                <button className="log-in-out" >Iniciar sesión</button>
            </form>
        </section>
    )
}