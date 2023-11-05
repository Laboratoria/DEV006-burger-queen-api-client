import React, { useState, useEffect } from "react";
import { requestGetCompletedOrders } from "../../functions/request";
import checkmarkIcon from '../../assets/checkmark (2).png';
import LogoBQ from '../../assets/LogoBQ.png';

function ReadyToServe() {
  const [completedOrders, setCompletedOrders] = useState([]);

  const showCompletedOrders = async () => {
    try {
      const response = await requestGetCompletedOrders();
      const deliveredOrders = response.filter(order => order.status === "delivered");
      setCompletedOrders(deliveredOrders);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    showCompletedOrders();
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  const formatElapsedTime = (startTimestamp, completionTimestamp) => {
    const elapsedTimeInSeconds = completionTimestamp - startTimestamp;
  console.log(completionTimestamp,startTimestamp, elapsedTimeInSeconds)
    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(elapsedTimeInSeconds % 60);
    const milliseconds = Math.floor((elapsedTimeInSeconds - Math.floor(elapsedTimeInSeconds)) * 1000);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };
  
  

  return (
    <>
      <nav className='bg-primary lg:h-28 md:h-20'>
        <div className='lg:h-24 lg:w-28 md:h-14 md:w-20 sm:h-32 sm:w-44'>
          <img className='' src={LogoBQ} alt="logo" />
        </div>
        <ul className='bg-gray lg:flex lg:items-center md:flex md:items-center'>
          <li className='lg:ml-mlready lg:pl-36 lg:-mt-16 lg:text-xl md:ml-72 md:-mt-6 md:text-2xl font-retro2'>Ordenes Listas</li>
        </ul>
      </nav>
      <main className="bg-black flex flex-col items-center">
        {completedOrders.map((order, index) => {
          const orderStartTimestamp = new Date(JSON.parse(localStorage.getItem(`orderStartTime_${order.id}`))).getTime() / 1000;
          const orderCompletionTimestamp = new Date(order.dateProcessed).getTime() / 1000;

          return (
            <article key={index} className="lg:mt-4 lg:w-hForm md:mt-3 md:w-h relative">
              <div className="order-card rounded-2xl bg-black text-white border-4 border-secondary  shadow-lg md:pb-10 lg:p-3 md:mt-8 lg:mb-9 md:text-xl ">
                <h2 className="lg:ml-80 lg:mt-10 md:ml-56 lg:text-3xl md:text-2xl md:mt-10 font-retro2  text-tertiary ">Orden #{order.id}</h2>
                <div className="flex flex-row lg:mt-3 md:mt-5 justify-between">
                  <p className="font-retro2 lg:text-xl md:text-xl ">Nombre del cliente: {order.clientName.clientName}</p>
                  <p className="font-retro2 lg:mr-4 md:mr-4 lg:text-xl md:text-xl">Numero de mesa: {order.tableNumber}</p>
                </div>
                <div className="lg:ml-4 md:ml-5">
                  <h3 className="font-retro2 lg:text-xl md:text-lg">Productos:</h3>
                  <ul>
                    {order.products.map((product, productIndex) => (
                      <li className="font-retro2" key={productIndex}>
                        {product.quantity} {product.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-retro2 lg:ml-4 md:ml-5 md:text-xl ">Tiempo de Completado: {formatElapsedTime(orderStartTimestamp, orderCompletionTimestamp)}</p> 
              </div>
              <img className="md:w-10 absolute top-4 right-4 md:mt-7" src={checkmarkIcon} alt="checkmark" />
            </article>
          );
        })}
      </main>
    </>
  );
}

export { ReadyToServe };