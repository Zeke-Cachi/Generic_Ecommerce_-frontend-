"use client";
import React, { useContext } from "react";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { CartContext } from "../Contexts/CartContext";

const CartCard: React.FC<{ item: Product }> = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="h-36 w-[90vw] flex justify-apart bg-gray-100 border-gray-200 shadow-xl rounded-lg my-4 p-2">
      <div>
        <h3>{item.title}</h3>
        <p>Unitary Price: {item.price}</p>
      </div>

      <div className="relative h-full w-[50%]">
        <Image
          src={item.image}
          fill={true}
          alt="Image of the product in cart"
          className="object-contain"
        />
      </div>

      <div className="flex">
        <button onClick={() => removeFromCart(item.id)}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => addToCart(item.id)}>+</button>
      </div>
    </div>
  );
};

export default CartCard;
