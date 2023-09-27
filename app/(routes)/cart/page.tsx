"use client";
import React, { useContext } from "react";
import { CartContext } from "@/app/Contexts/CartContext";
import CartCard from "@/app/Components/CartCard";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Cart = () => {
  const { state, totalAmount, clearCart } = useContext(CartContext);

  return (
    <section className="px-8">
      <div className="flex justify-between items-center w-[90vw]">
        <h2 className="text-[2.5rem] mb-8">Your Cart</h2>
        <button
          onClick={clearCart}
          className="btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800"
        >
          Empty cart
        </button>
      </div>
      <div>
        {state.cart.length === 0 ? (
          <div className="h-[60vh] w-full grid place-items-center">
            <div className="text-[2.5rem]">No items in cart yet!</div>
            <FaShoppingCart className="w-60 h-60 text-purple-800" />
          </div>
        ) : (
          state.cart.map((item, i) => <CartCard key={i} item={item} />)
        )}
      </div>
      <div className="flex items-center justify-start mb-28 mt-8">
        <h2
          className={`${
            state.cart.length === 0 ? "hidden" : "block"
          } text-[2rem] me-4`}
        >
          Total: ${totalAmount.toFixed(2)}
        </h2>
        <Link
          href="/cart/checkout"
          className={`btn btn-link mt-4${
            state.cart.length === 0 ? "hidden" : "block"
          }`}
        >
          Go to checkout
        </Link>
      </div>
    </section>
  );
};

export default Cart;
