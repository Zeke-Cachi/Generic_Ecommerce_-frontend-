"use client";
import React, { useContext } from "react";
import { CartContext } from "@/app/Contexts/CartContext";
import CartCard from "@/app/Components/CartCard";

const Cart = () => {
  const { state } = useContext(CartContext);

  return (
    <section className="px-8">
      <h2>Your Cart</h2>
      <div>
        {state.cart.length === 0 ? (
          <div>No items in cart yet!</div>
        ) : (
          state.cart.map((item, i) => <CartCard key={i} item={item} />)
        )}
      </div>
    </section>
  );
};

export default Cart;
