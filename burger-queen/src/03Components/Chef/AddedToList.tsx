import { IAddedToList } from "../Interfaces";
import React, { useState } from "react";
import { TimeCounter } from "./TimeCounter";
import { completeOrder } from "../../02App/patchOrders";

export const AddedToList: React.FC<IAddedToList> = ({
  client,
  id,
  products,
  status,
  dateEntry,
}) => {
  const [buttonStatus, setButtonStatus] = useState(status);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    Array(products.length).fill(false)
  );
  const handleCheckboxChange = (productId: number) => {
    const newSelectedCheckboxes = [...selectedCheckboxes];
    newSelectedCheckboxes[productId] = !newSelectedCheckboxes[productId];
    setSelectedCheckboxes(newSelectedCheckboxes);
    localStorage.setItem(
      "selectedCheckboxes",
      JSON.stringify(newSelectedCheckboxes)
    );
  };
  React.useEffect(() => {
    const storedSelectedCheckboxes = localStorage.getItem("selectedCheckboxes");
    if (storedSelectedCheckboxes) {
      setSelectedCheckboxes(JSON.parse(storedSelectedCheckboxes));
    } else {
      setSelectedCheckboxes(Array(products.length).fill(false));
    }
  }, []);

  const handleSendButton = () => {
    if (buttonStatus === "Pendiente") {
      completeOrder(id)
        .then((response) => {
          setButtonStatus("Completado");
          console.log("logrado");
          return response;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <main className="bg-press h-auto w-[100%] text-[1.1rem] p-[20px] mb-[15px] text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70">
      <section className="h-[90%] w-[100%] m-[10px] grid grid-cols-3">
        {/* ---TIME--- */}
        <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row justify-evenly items-center gap-1">
            <p>Hora pedido:</p>
            <div className="bg-skin h-[50%] w-[40%] rounded-5">{dateEntry}</div>
            <p>Tiempo:</p>
            <div className="bg-skin wh-[50%] w-[20%] rounded-5">
              <TimeCounter dateEntry={dateEntry} />
            </div>
          </div>
        </div>
        {/* ---CLIENT--- */}
        <div className="indent-4 min-h-[70px] w-[100%] col-start-1 col-end-4 flex justify-center items-center">
          <div className="h-[66px] w-[100%] p-[1%] flex flex-row gap-1">
            <p>Nombre:</p>
            <p className="bg-skin h-[50%] w-[40%] rounded-5">{client}</p>
          </div>
        </div>
        {/* ---PRODUCT--- */}
        <form className="col-start-1 col-end-3 flex flex-col">
          {products.map((product) => (
            <label
              className="mb-4 flex items-center"
              key={product.product.id}
              htmlFor={`checkbox-${product.product.id}`}
            >
              <input
                type="checkbox"
                id={`checkbox-${product.product.id}`}
                className="w-8 h-8"
                checked={selectedCheckboxes[product.product.id] || false}
                onChange={() => handleCheckboxChange(product.product.id)}
              />
              <span className="ml-4">
                ({product.qty}) {product.product.name}
              </span>
            </label>
          ))}
        </form>
        {/* ---BUTTON--- */}
        <div className="col-end-3 col-end-4 flex justify-end items-center">
          <button
            value={status}
            className={`h-[50px] w-[80%]  rounded-r-[25px] border-[1.5px]  ${
              status === "Pendiente"
                ? "bg-minusButtom text-redText border-redText"
                : "bg-plusButtom text-greenText border-greenText"
            }`}
            onClick={() => {
              if (
                status === "Pendiente" &&
                !selectedCheckboxes.some((isChecked) => isChecked)
              ) {
                alert(
                  "Debe seleccionar al menos un checkbox antes de marcar como Pendiente."
                );
              } else {
                handleSendButton();
              }
            }}
          >
            {buttonStatus}
          </button>
        </div>
      </section>
    </main>
  );
};
