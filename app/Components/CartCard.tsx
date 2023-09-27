"use client";
import React, { useContext } from "react";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { CartContext } from "../Contexts/CartContext";

const CartCard: React.FC<{ item: Product }> = ({ item }) => {
  const { addToCart, removeFromCart, completelyRemoveItem } =
    useContext(CartContext);

  return (
    <div className="h-36 w-[90vw] grid grid-cols-4 grid-rows-1 items-center bg-gray-100 border-gray-200 shadow-xl rounded-lg my-4 p-2">
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

      <div className="flex justify-end items-center w-full pe-16">
        <button
          className="bg-purple-100 rounded-full h-12 w-12 me-4 text-xl font-bold transition-all  active:bg-purple-300"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </button>
        <p className="text-center text-xl">{item.quantity}</p>
        <button
          className="bg-purple-100 rounded-full h-12 w-12 ms-4 text-xl font-bold transition-all active:bg-purple-300"
          onClick={() => addToCart(item.id)}
        >
          +
        </button>
      </div>

      <button
        onClick={() => completelyRemoveItem(item.id)}
        className="btn btn-primary bg-purple-800 mx-auto text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800"
      >
        Remove item
      </button>
    </div>
  );
};

export default CartCard;
