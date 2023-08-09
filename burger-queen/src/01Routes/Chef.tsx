import React, { useEffect, useState } from "react";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { GetOrders } from "../02App/getOrders";
import { AddedToList } from "../03Components/Chef/AddedToList";

export const Chef: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // En el efecto, obten las órdenes utilizando la función GetOrders
    GetOrders()
      .then((data) => {
        setOrders(data); // Guarda las órdenes en el estado 'orders'
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  }, []);

  return (
    <article className="h-[97vh] flex flex-col m-[20px]">
      {/* ---HEADER(LOGO + MESERO)--- */}
      <header className=" z-1 w-[100%] h-[20%] mb-[20px] flex items-center justify-between">
        <LogoPng />
        <div className="w-[100%] h-[100%] flex flex-col items-end">
          <LoggedUserAndExist />
          <label
            id="waiterPg"
            className="font-bold text-[90px] text-crema border-brownText drop-shadow-[4px_4px_0.5px_#65362A]"
          >
            COCINERO
          </label>
        </div>
      </header>
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---entregado- pendiente--- */}
        <section
          id="list"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <h1
            className={`h-[100%] w-[250px] bg-crema rounded-t-[25px] text-3xl font-bold flex items-center justify-center`}
          >
            Pedidos
          </h1>
        </section>

        <section
          id="listado"
          className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto"
        >
          {orders.map((order) => (
            <AddedToList
              id={order.id}
              key={order.id}
              client={order.client}
              products={order.products}
              dateEntry={order.dateEntry}
              userId={order.userId}
              status={order.status}
            />
          ))}
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
