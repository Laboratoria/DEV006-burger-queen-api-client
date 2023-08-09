import trashCan from "../../04Images/trashCan.png";
interface IAddedToCartProps {
  name: string;
  price: number;
  Increment: () => void;
  Decrement: () => void;
  Delete: ()=> void,
  clicks: number
}
export const AddedToCart: React.FC<IAddedToCartProps> = ({
  name,
  price,
  clicks,
  Increment,
  Decrement,
  Delete,
}) => {
  return (
    <div
      id="productTable"
      className="h-[65px] w-[100%] grid grid-cols-10 gap-1 text-center text-[1.3rem] mb-[5px]"
    >
      <div id="product" className="bg-skin col-span-3">
        {name}
      </div>
      <div id="quantity" className="bg-skin col-span-4 grid grid-cols-3 text-[2.5rem]">
        <div id="minus" className="bg-minusButtom" onClick={Decrement}>
          -
        </div>
        <div id="number"  className="text-[1.5rem]">{clicks}</div>
        <div id="plus" className="bg-plusButtom text-[2.5rem]" onClick={Increment}>
          +
        </div>
      </div>
      <div id="price" className="bg-skin col-span-2 text-[1.5rem]">
        ${price * clicks}
      </div>
      <img
        id="delete"
        src={trashCan}
        alt="delete"
        className="w-[80%] col-span-1 object-fit"
        onClick={Delete}
      />
    </div>
  );
};
interface Total {
  cartItems: IAddedToCartProps[];
}
export const TotalAddedToCart: React.FC<Total> = ({cartItems}) => {

  const totalPrice= cartItems.reduce((total, product)=>{
    return total + (product.price * product.clicks);
   }, 0)

  return (
    <div
      id="total"
      className="h-[50px] mt-[25px] grid grid-cols-10 gap-1 text-center"
    >
      <div className="bg-skin col-span-3 rounded-tl-[15px] rounded-bl-[15px]">
        Total
      </div>
      <div
        id="totalPrice"
        className="bg-skin col-span-6 rounded-tr-[15px] rounded-br-[15px]"
      >
      ${totalPrice}
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};
