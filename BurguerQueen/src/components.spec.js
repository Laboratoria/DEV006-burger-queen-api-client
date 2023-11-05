//import React from "react";
import  {Home, logo, ButtonWaiter, ButtonKitchen, ButtonAdmin}  from "./Components/Home/Home";
import {render, screen} from '@testing-library/react'
import {
    BrowserRouter
  
  } from "react-router-dom";

describe('HomeComponent', ()=>{
    it(' Se renderizan los componentes',()=>{
        const {getByTitle}= render(<BrowserRouter><Home/></BrowserRouter>);
        const containerElement= getByTitle('contenedor botones')
     expect(containerElement).toBeTruthy();
    });
});