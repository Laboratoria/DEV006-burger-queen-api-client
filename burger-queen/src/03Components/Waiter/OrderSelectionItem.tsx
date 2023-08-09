import { useState } from "react";

interface OrderSelectionItemProps {
  name: string;
  price: number;
  quantity: number;
  // image: string;
  onClick?: () => any;
 }


   export const OrderSelectionItem: React.FC<OrderSelectionItemProps> = ({ name, price,quantity, onClick }) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(true);
      if (onClick) {
        onClick();
      }
    };
  
    return (
      <div
        id="buttom1"
        className={`h-[90px] w-[220px] text-[1.1rem] p-4 text-darkBrown font-extrabold border-[0.1px] border-brownText rounded-25 flex flex-row shadow-notPressShadow opacity-70 ${
          isClicked ? quantity > 0
           ? "text-darkBrown border-brownText shadow-pressShadow opacity-100 bg-press"
            : ""
            : ""
          }`}
        onClick={handleClick}
      >
        {/* <img
        src={image} // Proporcionar la URL de la imagen en el atributo src
        alt="muestra del producto" // Agregar un atributo alt para accesibilidad
        className="h-[90px] w-[140px] rounded-tl-25 rounded-bl-25"
      /> */}
        <div id="product" className="h-[90px] w-[140px] rounded-tl-25 rounded-bl-25">
          {name}
        </div>
        <div id="price" className="h-[90px] w-[60px] rounded-tr-25 rounded-br-25">
          ${price}
        </div>
        </div>
    );
  };