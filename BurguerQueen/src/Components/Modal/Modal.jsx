import React from "react";
import {createPortal} from "react-dom";

function Modal({children}) {
    return createPortal(
        <div className=" bg-gray-400  bg-opacity-40 flex h-full w-full justify-center items-center text-black fixed top-0 left-0 right-0  bottom-0 ">
            {children}
        </div>,
        document.getElementById("modal") 
    );
}
export {Modal};