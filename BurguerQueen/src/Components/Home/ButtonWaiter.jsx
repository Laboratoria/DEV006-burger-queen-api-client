import {Link} from "react-router-dom"
 
function ButtonWaiter() {
    return(
 <Link to ='/Login'> <button className="buttons  w-96  h-20 sm:h-12 sm:w-64 md:h-20 md:w-96 flex-shrink-0 rounded-full border border-black bg-secondary text-black text-center font-retro2 lg:text-2xl md:text-2xl sm:text-sm font-bold leading-normal  hover:shadow-xl  hover:scale-110 hover:shadow-tertiary hover:transition-transform hover:duration-600 hover:ease-out shadow">SOY MESERO/A</button></Link>
       
    )
}

export {ButtonWaiter};