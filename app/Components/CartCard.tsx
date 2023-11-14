"use client";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { UseGlobalCart } from "@/app/CustomHooks";
import Button from "./Button";
import { useGlobalUtils } from "../Contexts/UtilsContext";

const CartCard: React.FC<{
  item: Product;
  showSecondaryBtn: boolean;
  extraStyling?: string;
}> = ({ item, showSecondaryBtn, extraStyling }) => {
  const { addToCart, removeFromCart, completelyRemoveItem } = UseGlobalCart();
  const { useWindowWidth } = useGlobalUtils();
  const isResponsive = useWindowWidth();

  return (
    <div
      className={`${extraStyling} min-h-52 lg:h-36 grid grid-rows-2 grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 items-center bg-gray-100 border-gray-200 shadow-xl rounded-lg my-4 p-2`}
    >
      <div className="w-full h-full flex flex-col justify-between lg:justify-around">
        <h3 className="text-xl">{item.title}</h3>
        {isResponsive ? <hr className="my-2 text-purple-800" /> : null}
        <p>
          Unitary Price: <span className="italic font-bold">${item.price}</span>
        </p>
      </div>

      <div className="relative h-1/2 w-1/2 mx-auto lg:w-full lg:h-full">
        <Image
          src={item.image}
          fill={true}
          alt="Image of the product in cart"
          className="object-contain"
        />
      </div>

      {showSecondaryBtn ? (
        <div className="flex justify-center lg:justify-end items-center w-full lg:pe-16 col-span-2 lg:col-span-1">
          <button
            className="bg-purple-100 rounded-full h-12 w-12 me-4 text-xl font-bold transition-all  active:bg-purple-300"
            onClick={() => item._id && removeFromCart(item._id)}
          >
            -
          </button>
          <p className="text-center text-xl">{item.quantity}</p>
          <button
            className="bg-purple-100 rounded-full h-12 w-12 ms-4 text-xl font-bold transition-all active:bg-purple-300"
            onClick={() => addToCart(item._id)}
          >
            +
          </button>
        </div>
      ) : null}

      <Button
        passedFunctionWithId={completelyRemoveItem}
        _id={item._id}
        title={"remove Item"}
        optionalStyle="mx-auto col-span-2 lg:col-span-1"
      />
    </div>
  );
};

export default CartCard;
