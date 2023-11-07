/// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// eslint-disable-next-line no-unused-vars
import React from 'react';
import AdminHome from './components/adminview/adminview.jsx';
//import ChefView from './components/chefview/chefview';
import LoginProfile from './components/login/login.jsx';
// import { login } from './components/login/login';
import WaiterView from './components/waiterview/waiterview';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'; // Modulo BrowserRouter, Routes y Route desde 'react-router-dom'

function App() {
  return (
    // Usar el componente Router para envolver las rutas
    <Router>
      <>
        <Routes>

          <Route path='/' Component={LoginProfile} /> {/* se muestra cuando se accede a la página principal '/' */}

          {/* <Route path='/login' Component={ } />
          <Route path='/chefview' Component={ChefView} />*/}
          <Route path='/waiterview' Component={WaiterView} />
          <Route path='/adminview' Component={AdminHome} />

        </Routes>
      </>
    </Router>
  );
}

export default App
