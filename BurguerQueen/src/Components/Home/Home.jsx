import {Logo} from './logo'
import { ButtonWaiter } from './ButtonWaiter'
import { ButtonKitchen } from './ButtonKitchen'
import { ButtonAdmin } from './ButtonAdmin'
import 'tailwindcss/tailwind.css'

function Home(){
    return(
        <>
        <Logo />
        <div className=" sm:h-80  md:w-full md:h-h lg:h-96 flex flex-col justify-evenly items-center bg-primary ">
          <ButtonWaiter />
           <ButtonKitchen />
         <ButtonAdmin /> 
          </div>   
          </>
    )
}




export {Home}