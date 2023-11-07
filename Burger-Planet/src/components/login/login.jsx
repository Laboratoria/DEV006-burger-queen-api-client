// eslint-disable-next-line no-unused-vars
// import React from 'react';
import InputLogin from './formLogin.jsx';
import LogoLogin from './logo.jsx'
import 'tailwindcss/tailwind.css'

function LoginProfile() {
    return (
        <>
            <div className="min-w-full bg-DarkBlue">
                <LogoLogin />
                <InputLogin />
            </div>
        </>
    )
}

export default LoginProfile;