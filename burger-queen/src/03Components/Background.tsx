import burgerTR from "../04Images/topRight.png";
import burgerBL from "../04Images/bottomLeft.png";

export function Background(){
return(<section className="z-0">
      <img src={burgerTR} alt="burger" className=" h-auto w-9/12 absolute top-0 right-0 opacity-50"/>
      <img src={burgerBL} alt="burger" className="h-auto w-9/12 absolute bottom-0 left-0 opacity-50"/>
      </section> 
)
}