"use client";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { useGlobalCart } from "@/app/CustomHooks";
import Button from "./Button";

const CartCard: React.FC<{
  item: Product;
  showSecondaryBtn: boolean;
  extraStyling?: string;
}> = ({ item, showSecondaryBtn, extraStyling }) => {
  const { addToCart, removeFromCart, completelyRemoveItem } = useGlobalCart();

  return (
    <div
      className={`${extraStyling} h-36 grid grid-rows-1 items-center bg-gray-100 border-gray-200 shadow-xl rounded-lg my-4 p-2`}
    >
      <div className="w-full flex flex-col justify-around">
        <h3 className="text-xl">{item.title}</h3>
        <p>
          Unitary Price: <span className="italic font-bold">${item.price}</span>
        </p>
      </div>

      <div className="relative w-full h-full">
        <Image
          src={item.image}
          fill={true}
          alt="Image of the product in cart"
          className="object-contain"
        />
      </div>

      {showSecondaryBtn ? (
        <div className="flex justify-end items-center w-full pe-16">
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
        optionalStyle="mx-auto"
      />
    </div>
  );
};

export default CartCard;
