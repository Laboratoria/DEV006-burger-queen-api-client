import React from "react"

import { useState } from "react"

export default function Modal () { 
const [modal, setModal] = useState(false)

const toggleModal = () => {
    setModal(!modal)
}

return (
<div> 
    <button onClick={toggleModal} className="btn-modal"> boton modal </button>

<div className="modal">
    <div className="overlay"> </div>
    <div className="modal-content">
        <h2>hola modal</h2>
        <p>¿Quieres enviar el pedido?</p>
        <button className="cancel-btn">Cancelar</button> 
        <button className="send-btn">Enviar</button>
    </div>
</div>
</div>
    )
}