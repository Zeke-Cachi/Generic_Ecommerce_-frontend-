"use client";
import Hero from "./Components/Hero";
import ProductCard from "./Components/ProductCard";
import { useEffect, useRef } from "react";
import { useGlobalCart } from "@/app/CustomHooks";
import { Product } from "@/typesAndInterfaces";
import PopularProducts from "./Components/PopularProducts";

const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;

const scrollToRef = (
  ref: React.RefObject<HTMLHeadingElement>,
  offset: number
) => {
  const start = window.pageYOffset;
  const target = ref.current?.offsetTop! - offset || 0;
  const duration = 1000;

  const startTime = performance.now();

  const animateScroll = (currentTime: DOMHighResTimeStamp) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, start + ease * (target - start));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export default function Home() {
  const { product } = useGlobalCart();
  const goToRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (window.scrollY === 0) {
        goToRef.current && scrollToRef(goToRef, 130);
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
