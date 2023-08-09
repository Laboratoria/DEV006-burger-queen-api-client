import { useNavigate } from 'react-router-dom';
// const HandleLogOut
// usar .removeItem en localStorage, 
//  para quitar password
// navigate para volver a login

const HandleLogOut = ()=>{
    localStorage.removeItem("token")
    useNavigate("/")
}