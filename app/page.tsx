"use client";
import Carousel from "./Components/Carousel";
import ProductCard from "./Components/ProductCard";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "./Contexts/CartContext";
import { Product } from "@/typesAndInterfaces";

export default function Home() {
  const { product } = useContext(CartContext);
  const goToRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (window.scrollY === 0) {
        goToRef.current &&
          goToRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  }, []);

  return (
    <>
      <Carousel />
      <h2 ref={goToRef} className="px-4 my-4 text-[2.5rem]">
        Popular items
      </h2>
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
