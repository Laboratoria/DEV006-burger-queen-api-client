import LogoImageGif from "../04Images/LogoImageGif.gif"
import LogoImagePng from "../04Images/LogoImagePng.png"

export function LogoGif(){
   return <img src={LogoImageGif} alt="burgerQueenLogo" />
}

export function LogoPng(){
    return <img src={LogoImagePng} alt="burgerQueenLogo" className="h-[270px]"/>
 }