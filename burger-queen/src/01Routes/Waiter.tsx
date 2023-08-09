import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { GetProducts } from "../02App/getProduct";
import { PostOrders } from "../02App/postOrders";
import { OrderSelectionItem } from "../03Components/Waiter/OrderSelectionItem";
import {
  AddedToCart,
  TotalAddedToCart,
} from "../03Components/Waiter/AddedToCart";
import { LoggedUserAndExist } from "../03Components/LoggedUserAndExist";
import { DeletePopup } from "../03Components/Waiter/DeletePopup";
import { LogoPng } from "../03Components/logoComponent";
import { Background } from "../03Components/Background";
import { ICartItems, orderItems, orderData } from "../03Components/Interfaces";

export const Waiter: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productType, setProductType] = useState("Desayuno");
  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [customerName, setCustomerName] = useState("");
  //const [customerTable, setcustomerTable] = useState("");
  useEffect(() => {
    GetProducts()
      .then((data) => {
        const productsWithClick = data.map((product: any) => ({
          ...product,
          clicks: 0,
        }));
        console.log(data);
        setProducts(productsWithClick);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  const handleSelectProductType = (type: string) => {
    setProductType(type);
  };
  const handleAddToCart = (product: any) => {
    // Verifica si el producto ya está en el carrito
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar su contador de clics
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems.map((item) =>
          item.id === product.id ? { ...item, clicks: item.clicks + 1 } : item
        );
        return updatedCartItems;
      });
    } else {
      // Si el producto no está en el carrito, agregarlo con un contador de clics inicial de 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, clicks: 1 },
      ]);
    }
  };
  const handleIncremetQuantity = (productId: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === productId ? { ...item, clicks: item.clicks + 1 } : item
      );
      return updatedCartItems;
    });
  };
  const handleDecremetQuantity = (productId: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === productId
          ? { ...item, clicks: Math.max(1, item.clicks - 1) }
          : item
      );

      return updatedCartItems;
    });
  };
  const handleDeleteCartItem = (productId: number) => {
    DeletePopup()
      .then((result) => {
        if (result.isConfirmed) {
          setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
              (item) => item.id !== productId
            );
            return updatedCartItems;
          });
        } else if (result.isDenied) {
          // El usuario hizo clic en el botón cancelar o cerró el SweetAlert
          console.log("Eliminación cancelada");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetValue = (
    callback: (a: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    callback(event.target.value);
  };

  const handleSendOrders = () => {
    //   const currentDateFormatted = dayjs().format("YYYY-MM-DD HH:mm:ss");
    // console.log("Current Date:", currentDateFormatted);

    const orderItems: orderItems[] = cartItems.map((item) => ({
      qty: item.clicks,
      product: {
        id: item.id,
        name: item.name,
        price: item.price,
        type: item.type,
        dateEntry: item.dateEntry,
        // imagen: item.image,
      },
    }));
    const orderData: orderData = {
      userId: localStorage.getItem("userId"),
      client: customerName,
      products: orderItems,
      status: "Pendiente",
      dateEntry: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    console.log(orderData);
    PostOrders(orderData)
      .then((response) => {
        console.log("se guardooo perro", response);
        return response;
      })
      .catch((error) => {
        7;
        console.error("error perro", error);
      });
  };

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
            MESERO
          </label>
        </div>
      </header>

      {/* ---MAIN SECTION--- */}
      <main id="content" className=" z-1 h-[80%] w-[100%]">
        {/* ---Desayuno - Almuerzo/Cena--- */}
        <section
          id="desayunoOalmuerzoCena"
          className=" h-[10%] w-[100%] flex flex-row justify-end"
        >
          <div
            className={`h-[100%] w-[220px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Desayuno"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Desayuno")} // Manejador para seleccionar desayuno
          >
            <h1>Desayuno</h1>
          </div>
          <div
            className={`h-[100%] w-[280px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Almuerzo"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Almuerzo")} // Manejador para seleccionar Almuerzo
          >
            <h1>Almuerzo/Cena</h1>
          </div>
          <div
            className={`h-[100%] w-[220px] bg-crema text-brownText rounded-t-[25px] text-3xl font-bold flex items-center justify-center ${
              productType === "Pedidos"
                ? "textTransform: uppercase"
                : "bg-yellow" // Aplicamos estilo con bg-yellow si es el tipo de producto seleccionado
            }`}
            onClick={() => handleSelectProductType("Pedidos")} // Manejador para seleccionar Almuerzo
          >
            <h1>pedidos</h1>
          </div>
        </section>

        {/* ---Order&Menu--- */}
        <section
          id="menuYCompra"
          className=" h-[755px] w-[100%] bg-crema p-[20px] rounded-b-[25px] rounded-tl-[25px] overflow-auto"
        >
          {/* ---Name + Table--- */}
          <div
            id="nameAndTable"
            className="h-[10%] w-[100%] p-[1%] text-brownText text-[1.2rem] font-bold flex flex-row justify-evenly items-center gap-1"
          >
            <h1>Nombre:</h1>
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleSetValue(setCustomerName, e)}
              className="bg-skin h-[50%] w-[40%] rounded-5"
            ></input>
            <h1>Mesa:</h1>
            <input
              type="number"
              // value={customerTable}
              // onChange={(e) => handleSetValue(setcustomerTable, e)}
              className="bg-skin h-[50%] w-[20%] rounded-5"
            ></input>
          </div>

          {/* ---Order Selection--- */}
          <div
            id="orderSelection"
            className="h-auto w-[100%] p-[1%] flex flex-wrap justify-center justify-evenly text-center gap-y-4"
          >
            {/* ---Menu/Cart--- */}
            {products
              .filter((product) => product.type === productType)
              .map((product) => (
                <OrderSelectionItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  // image={product.image}
                  quantity={
                    cartItems.find((item) => item.id === product.id)?.clicks ||
                    0
                  }
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                />
              ))}
          </div>

          {/* ---Shopping Cart--- */}

          <div
            id="cart"
            className="h-auto w-[100%] p-[5%] text-[1.5rem] font-bold"
          >
            {/* ---Titles--- */}
            <div
              id="titles"
              className="h-[50px] w-[100%] grid grid-cols-10 gap-1 text-center mb-[15px]"
            >
              <div
                id="product"
                className="bg-yellow col-span-3 rounded-tl-[15px]"
              >
                Producto
              </div>
              <div id="quantity" className="bg-yellow col-span-4">
                Cantidad
              </div>
              <div
                id="price"
                className="bg-yellow col-span-2 rounded-tr-[15px]"
              >
                Precio
              </div>
              <div id="delete" className="col-span-1"></div>
            </div>

            {/* ---Products added--- */}
            {cartItems.map((product) => (
              <AddedToCart
                key={product.id}
                name={product.name}
                clicks={product.clicks}
                price={product.price}
                Increment={() => handleIncremetQuantity(product.id)}
                Decrement={() => handleDecremetQuantity(product.id)}
                Delete={() => handleDeleteCartItem(product.id)}
              />
            ))}
            {/* ---Total--- */}
            <TotalAddedToCart cartItems={cartItems} />
          </div>

          {/* ---Send Buttom--- */}
          <div
            id="SendButtom"
            className="h-[10%] w-[100%] flex justify-center items-center"
          >
            <button
              type="submit"
              className="bg-colorButton hover:bg-buttonHover h-[65px] w-[500px] items-center rounded-[45px]  font-bold text-brownText text-[1.5rem]"
              onClick={handleSendOrders}
            >
              Enviar a Cocina
            </button>
          </div>
        </section>
      </main>

      {/* ---Background--- */}
      <Background />
    </article>
  );
};
