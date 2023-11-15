"use client";
import Hero from "./Components/Hero";
import ProductCard from "./Components/ProductCard";
import { useEffect, useRef } from "react";
import { UseGlobalCart } from "@/app/CustomHooks";
import { Product } from "@/typesAndInterfaces";
import PopularProducts from "./Components/PopularProducts";
import H2Title from "./Components/H2Title";
import { FaSearch } from "react-icons/fa";
import { scrollToRef } from "./functions";
import { useGlobalUtils } from "./Contexts/UtilsContext";

export default function Home() {
  const { product, showSearchBar, setShowSearchBar } = UseGlobalCart();
  const { useWindowHeight } = useGlobalUtils();
  const goToRef = useRef<HTMLHeadingElement>(null);
  const checkHeight = useWindowHeight();

  useEffect(() => {
    setTimeout(() => {
      if (window.scrollY === 0) {
        goToRef.current && scrollToRef(goToRef, 130);
      }
    }, 2000);
  }, []);

  return (
    <main className="bg-white">
      {checkHeight > 1000 && (
        <FaSearch
          className="fixed bottom-[5vh] right-[5vw] h-12 w-12 text-purple-500 opacity-30 hover:opacity-100 transition-all cursor-pointer z-40 lg:hidden"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
      )}
      <Hero />
      <PopularProducts ref={goToRef} />
      <H2Title title="Browse" />
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
    </main>
  );
}
