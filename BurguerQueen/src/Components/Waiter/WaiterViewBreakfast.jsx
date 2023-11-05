import LogoBQ from '../../assets/LogoBQ.png'
import papelera from '../../assets/papelera.png'
import { ProductList } from './ProductList'
import { useState, useEffect } from 'react'
import { Modal } from '../Modal/Modal';
import { ClientForm } from '../ClientForm/ClientForm';
import { requestPostOrder } from '../../functions/request';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


function WaiterViewBreakfast(){
  const[showBreakfast, setShowBreakfast] = useState(true);
  const[selectedProducts, setSelectedProducts] = useState([]);
  const[openModal, setOpenModal] = useState(false);
  const [clientInfo, setClientInfo] = useState('');
  const [clientTable, setClientTable] = useState('');
  const [orderData, setOrderData] = useState([]);
 
  const HandleShowBreakfast = () => {
    setShowBreakfast(true)
  };
  const HandleShowLunch = () => {
    setShowBreakfast(false)   
  }
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const onClientInformation=(name,table)=>{
    setClientInfo(name)
    setClientTable(table)
  }
 
  const clearOrder = () => {
    setSelectedProducts([]);
   
  };

  const clearClientInfo=()=>{
    setClientInfo('');
    setClientTable('');
  };

  const addToSelectedProducts = (product)=> {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find((p)=> p.id === product.id);
    if(existingProduct){
      const productQuantity=  existingProduct.quantity++
      localStorage.setItem('productQuantity', productQuantity)
    } else{ 
     updatedProducts.push({...product, quantity: 1})
     
    }
    setSelectedProducts(updatedProducts)
  };

  //Eliminar producto totalmente
  const removeFromSelectedProducts= (product)=>{
    const updatedProducts = selectedProducts.filter((p)=>p.id!==product.id);
   setSelectedProducts(updatedProducts)
    }
 
  const decreaseFromSelectedProducts = (product) => {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find((p) => p.id === product.id);
    if (existingProduct && existingProduct.quantity === 1) {
      removeFromSelectedProducts(product)
    } else if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity--;
      setSelectedProducts(updatedProducts)
  }

};

const onSubmitOrder = async (e) => {
  e.preventDefault();
  Swal.fire({
    title: 'Estás seguro que deseas mandar a cocina?',
    text: "No podrás deshacer esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4ABC78',
    cancelButtonColor: '#D64550',
    confirmButtonText: 'Si, mandar a cocina!',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        if (clientInfo && clientTable && selectedProducts.length > 0) {
          const token = localStorage.getItem('token');
         
          const orderData = {
            clientName: clientInfo,
            tableNumber: clientTable,
            products: selectedProducts,
          };
          const response = await requestPostOrder(orderData, clientTable, selectedProducts, token);
          console.log('Response from server:', response);
          const orderDataString = JSON.stringify(orderData);
          localStorage.setItem('orderData', orderDataString);

          const sendOrderToKitchen = () => {
            const orderDataString = localStorage.getItem('orderData');
            if (orderDataString) {
              const orderData = JSON.parse(orderDataString);
              setSelectedProducts([]);
              console.log(orderData);
            } else {
              console.log('No order data found in local storage.');
            }
          };

          sendOrderToKitchen();

          setOrderData([]);
          localStorage.removeItem('orderData');

          Swal.fire(
            'Enviado!',
            'Tu orden ha sido enviada',
            'success'
          );
        } else {
          console.log("Por favor, ingrese el nombre del cliente, el número de mesa y seleccione al menos un producto.");
        }
      } catch (error) {
        console.log('error recibiendo orden');
      }
    }
  });
};

const handleOpenModal= () => {
  setOpenModal(true);
}

    return (
   <section className=' bg-black text-white '>
 <nav className=' bg-primary lg:h-28 flex justify-between text-black sm:w-full sm:h-20 font-bold'>
 <div className='  lg:h-24 lg:w-28 sm:h-32  sm:w-44   '>
   <img className='' src={LogoBQ} alt="logo" />
 </div>

 <ul className=' flex lg:h-16 mt-8 lg:w-hForm mr-36 sm:h-9 sm:w-80 sm:ml-24 sm:justify-around bg-blue '> 
 <Link to='/ReadyToServe' className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg md:-ml-36'>Ordenes Listas</Link>
   <li className='lg:mb-20 sm:mb-24 border-red-600 lg:text-3xl font-retro2 lg:mr-20 md:text-lg'>Historial de Ordenes</li>
 </ul>
 </nav> 
 <div className='Buttons border-black flex lg:justify-around lg:mt-6 md:mt-10 md:justify-between'>
   <button onClick={handleOpenModal} className='lg:mr-96 font-bold border-4 border-secondary rounded-sm shadow-lg hover:scale-125 lg:p-2 lg:text-xl font-retro1 md:ml-3'>Nueva Orden</button>
   {openModal && (
    <Modal>
      <ClientForm setOpenModal={setOpenModal}  onClientInformation={onClientInformation}/>
    </Modal>
   )}
     <button onClick={HandleShowBreakfast} className='border-4 border-tertiary rounded-sm shadow-lg lg:-mr-20 lg:p-2 font-bold lg:text-xl font-retro1 hover:scale-125'>Desayuno</button>
    <button onClick={HandleShowLunch} className=' lg:mr-20 font-bold border-4 border-secondary rounded-sm shadow-lg lg:p-2 lg:text-xl font-retro1 hover:scale-125 md:mr-36'>Almuerzo</button>
 </div>
 <section className='flex justify-between md:mt-6'> 
 <article className=' lg:w-3/5 md:mt-14 md:ml-7'>
<ProductList showBreakfast={showBreakfast} addToSelectedProducts={addToSelectedProducts}  decreaseFromSelectedProducts={decreaseFromSelectedProducts} removeFromSelectedProducts={removeFromSelectedProducts}/>
</article>
<article className=' bg-primary h-auto lg:w-h lg:mt-14 lg:mr-16 md:mt-6 md:w-h '>
  <div className='lg:w-1/4 '>
    <p className='font-retro1 lg:text-2xl whitespace-nowrap lg:ml-5 lg:mb-12 lg:mt-10 md:mt-8 md:ml-9 md:text-2xl'>Resumen de la Orden</p>
    <div id='datosCliente flex'>
      <div className='md:ml-12 md:w-56'>
      <p className=' whitespace-nowrap lg:text-xl lg:font-bold font-retro2 lg:ml-2 md:text-2xl md:mt-5' >Nombre del cliente: {clientInfo}</p>
      <p className=' whitespace-nowrap lg:text-xl lg:font-bold font-retro2 lg:ml-2 md:text-2xl'>Número de mesa: {clientTable}</p> 
      </div>
      <div className='lg:ml-96 lg:-mt-12 lg:mb-12 md:-mt-12 md:mb-11'>
      <button className=" font-extrabold text-2xl bg-btn2 w-9 lg:ml-8 md:ml-mtboton" onClick={clearClientInfo} type="button">X</button>
      </div>
    </div>
    <table>
      <thead> 
        <tr>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl md:text-xl md:pl-8 '>Imagen</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl md:text-xl md:pl-6'>Producto</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl md:text-xl md:pl-6'>Cantidad</th>
          <th className='lg:pl-9 lg:mt-12 font-retro2 lg:text-xl md:text-xl md:pl-6'> Precio</th>
        </tr>
      </thead>
      <tbody className=' w-auto'>
       {selectedProducts.map((product, index)=>{
        return (
        <tr key={index}>
          <td className='lg:pl-9'>
            <img src={product.image} alt={product.name} className=' lg:p-2 lg:w-96 lg:h-20 lg:mt-5 md:w-24 md:h-24 md:pl-6'/>
          </td>
          <td className='lg:pl-12 font-retro2 lg:text-lg md:text-xl md:pl-10'>{product.name}</td>
          <td className='lg:pl-16 font-retro2 lg:text-lg md:text-xl md:pl-12'>
            {product.quantity}
          </td>
          <td className='lg:pl-14 font-retro2 lg:text-lg md:pl-9 md:text-xl'>${product.price * product.quantity}</td>  
          <td>
            <div className='bg-blue w-16 h-16'>
          <button onClick={()=> {removeFromSelectedProducts(product)}}>
            <img src={papelera} alt="papelera" className='   w-9 h-8 mt-3' />
          </button>
          </div>
          </td>

        </tr>
        );
       })}
      </tbody>
    </table>
  </div>
  <p className='font-retro2 lg:text-2xl lg:mt-12 lg:ml-9 md:mt-12 md:text-2xl md:pl-8'>Total: ${calculateTotal()}</p>
  <div className='flex md:justify-around lg:w-mtboton lg:ml-8 lg:mt-10 lg:mb-5 md:ml-2 md:mt-7'>
      <button className=" border-4 border-black rounded-md lg:w-96 lg:h-20 text-2xl font-extrabold bg-btn1 hover:scale-125 md:text-xl md:w-32 md:h-16 md:ml-12" type="submit" onClick={onSubmitOrder}>Mandar a cocina</button>
      <button className=" border-4 border-black rounded-md lg:w-96 lg:h-20 text-2xl  font-extrabold lg:ml-8  bg-btn2 hover:scale-125 md:text-xl md:w-32 md:h-16 md:mr-24" type="button" onClick={clearOrder} >Cancelar Orden</button>
</div>
</article> 

 </section>

   </section>

    )
}

export{WaiterViewBreakfast}