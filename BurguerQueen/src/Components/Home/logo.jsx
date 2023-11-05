import LogoBQ from '../../assets/LogoBQ.png'
import 'tailwindcss/tailwind.css'
function Logo() {
    return(
        <div className="flex bg-black justify-center w-full ">
        <img src= {LogoBQ} alt="logo" className="w-full md:w-auto lg:w-auto object-contain" /> 
        </div>
    
    )
}

export {Logo}; 