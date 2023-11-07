import sanduche from '../../assets/sanduche_final.png'
import viniloFinal from '../../assets/vinilo_final_720.png'
import inicio from '../../assets/inicio.png'
import {requestGet, requestProduct} from '../../functions/request'
import {useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
function Form(){
 const[user,setUser] = useState('');
 const[password,setPassword]= useState('');
 const[authData,setAuthData] = useState(null);
 const[errorMessage, setErrorMessage] = useState('');

 const navigate = useNavigate();

  const HandleSubmit= e =>{
    e.preventDefault()
  };

  const HandleChangeEmail = e =>{
   setUser(e.target.value)
  
  }
 

  const HandleChangePassword = e =>{
    setPassword(e.target.value)
    
  }

  const HandleLogin = async (e) => {
e.preventDefault();
try {
  const data = await requestGet(user,password);
  setAuthData(data)
  const token = data.accessToken;
  localStorage.setItem("token", token);
  const role = data.user.role;
  localStorage.setItem("role", role)

  const dataProducts=await requestProduct();
  console.log(dataProducts)

  switch(role){
    case 'admin':
    navigate('/AdminView')
      break;
    case 'waiter':
      navigate('/WaiterViewBreakfast') 
      break;
    case 'kitchen':
      navigate('/KitchenView')
      break;
      default:
        console.log('default case')
        break;
  }
  }catch (error) {
   setErrorMessage( error.message)
   console.log(setErrorMessage)
  }
}

    return (
      <> 
      <div className='bg-primary  lg:h-6  md:h-3 absolute' >
     <Link to= '/'><img className='  sm:h-8 sm:w-10 sm:ml-4 sm:mt-6 lg:h-20 lg:w-20  md:h-16 md:w-16 bg-primary relative md:mt-8 md:ml-4' src={inicio} alt="inicio" /></Link>
      </div>
        <section className='bg-primary sm:h-screen sm:w-screen lg:h-screen lg:w-screen md:h-screen md:w-screen flex justify-center items-center '>
          <div className=' flex-col z-10   sm:mr-mrForm sm:ml-44 lg:-mr-hForm lg:ml-mlForm  md:-mr-mlForm  md:ml-96' >
          <img  className =' lg:w-40 lg:h-36 sm:h-28 sm:w-32 md:h-48 md:w-48 ' src={viniloFinal} alt="vinilo" />
          <img  className =' lg:w-40 lg:h-36 sm:h-28 sm:w-32 md:h-48 md:w-48'   src={viniloFinal} alt="vinilo"  />
          <img  className =' lg:w-40 lg:h-36 sm:h-28 sm:w-32 md:h-48 md:w-48' src={viniloFinal} alt="vinilo" />
          <img  className =' lg:w-40 lg:h-36 sm:h-28 sm:w-32 md:h-48 md:w-48' src={viniloFinal} alt="vinilo"  />
          <img  className =' lg:w-40 lg:h-36 sm:h-28 sm:w-32 md:h-48 md:w-48' src={viniloFinal} alt="vinilo"  />
       </div>
      <div className='bg-tertiary sm:h-3/4 sm:w-3/4  md:h-hForm md:w-h  lg:h-5/6 lg:w-2/4 rounded-3xl z-20 '>
      <form className='flex items-center flex-col h-full' onSubmit={HandleSubmit}>
        <p className='font-retro1  sm:text-lg text-center md:text-4xl font-bold sm:mt-10 lg:-mt-1  lg:py-10'>Ingresa con tus credenciales</p>
        <div className='flex md:mt-24 sm:mt-6 sm:-ml-6 lg:-mt-1 lg:mb-6' > 
        <img  className='  sm:w-9 sm:h-9 md:w-20 md:h-20 lg:w-20 lg:h-16 lg:-ml-20 ' src={sanduche} alt="sanduche"/>
        <label className='font-retro2 sm:text-lg md:text-4xl font-bold ' htmlFor="email">Correo Electrónico</label>
        </div>
       <input  className=' sm:h-12  md:h-20 md:w-96 lg:w-h  lg:h-16 border-4 rounded-lg px-4 py-4 focus:shadow-outline outline-none  focus:border-primary ' type="text" name="email" id="email" onChange={HandleChangeEmail} /> <br />
         <div className='flex md:mt-24 sm:mt-6 lg:-mt-1 lg:py-6 '> 
         <img  className='sm:w-10 sm:h-10 sm:-ml-20 md:h-20 md:w-20 lg:w-24 lg:h-16 md:-ml-32 lg:-ml-52' src={sanduche} alt="sanduche" />
         <label className='font-retro2 sm:text-lg md:text-4xl font-bold' htmlFor='password'>Contraseña</label>
         </div>
       <input className='sm:h-12 md:h-20 md:w-96 lg:w-h lg:h-16  border-4 rounded-lg px-4 py-4 focus:shadow-outline outline-none  focus:border-primary ' type="password" name="contraseña" id="password" onChange={HandleChangePassword} /> 
    
        {errorMessage && <p className=' bg-slate-100 text-red-600   font-black lg:text-3xl  md:text-3xl sm:mt-4 lg:mt-6 md:mt-4 p-1'>* {errorMessage}</p>}
       <button className=' bg-secondary  rounded-full sm:w-44 sm:h-12 md:w-60 md:h-20 lg:h-20 lg:w-60 md:text-4xl lg:text-2xl sm:text-xl font-bold sm:mt-20 md:mt-20 lg:mt-18 font-retro2  hover:shadow-xl  hover:scale-110  hover:shadow-black hover:transition-transform hover:duration-600 hover:ease-out shadow' type="submit" onClick={HandleLogin}> INGRESAR</button><br/>
  </form>
    </div>

    </section> 
        
    </>
   
  )
}
  


export {Form}