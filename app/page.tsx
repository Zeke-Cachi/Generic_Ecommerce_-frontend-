"use client";
import Carousel from "./Components/Carousel";
import ProductCard from "./Components/ProductCard";
import { useContext } from "react";
import { CartContext } from "./Contexts/CartContext";
import { Product } from "@/typesAndInterfaces";

export default function Home() {
  const { product } = useContext(CartContext);

  return (
    <>
      <Carousel />
      {product.length === 0 ? (
        <div className="w-full text-center">
          <div className="loading loading-spinner w-40 text-gray-300"></div>
        </div>
      ) : (
        <div className="px-4 flex gap-4 flex-wrap mt-4 mx-auto justify-center">
          {product.map((item: Product, i) => {
            return <ProductCard key={i} item={item} />;
          })}
        </div>
      )}
    </>
  );
}
