"use client";
import Hero from "./Components/Hero";
import ProductCard from "./Components/ProductCard";
import { useEffect, useRef } from "react";
import { useGlobalCart } from "./Contexts/CartContext";
import { useGlobalUser } from "./Contexts/UserContext";
import { Product } from "@/typesAndInterfaces";
import PopularProducts from "./Components/PopularProducts";

export default function Home() {
  const { product } = useGlobalCart();
  const { userData } = useGlobalUser();
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
      <Hero />
      <PopularProducts ref={goToRef} />
      <h2 className="px-4 my-4 text-[2.5rem]">Browse</h2>
      {product.length === 0 ? (
        <div className="w-full text-center">
          <div className="loading loading-spinner w-40 text-gray-300"></div>
        </div>
      ) : (
        <div className="px-4 flex gap-4 flex-wrap mt-4 mx-auto justify-center mb-8">
          {product.map((item: Product, i) => {
            return <ProductCard key={i} item={item} />;
          })}
        </div>
      )}
    </>
  );
}
