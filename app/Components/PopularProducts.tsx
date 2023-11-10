/* eslint-disable react/display-name */
"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { Product } from "@/typesAndInterfaces";
import { useGlobalCart, useWindowWidth } from "@/app/CustomHooks";
import ProductCard from "./ProductCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Carousel from "nuka-carousel";
import H2Title from "./H2Title";

const PopularItemsSlider = forwardRef<HTMLHeadingElement>(({}, ref) => {
  const [firstSlide, setFirstSlide] = useState<Product[]>([]);
  const [secondSlide, setSecondSlide] = useState<Product[]>([]);
  const [slideProduct, setSlideProducts] = useState<string>("");

  const { product } = useGlobalCart();

  const isResponsive = useWindowWidth();

  useEffect(() => {
    const sortedProductArray = product
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 10);
    setFirstSlide(() => sortedProductArray.slice(0, 5));
    setSecondSlide(() => sortedProductArray.slice(5, 10));
  }, [product]);

  const moveRight = () => {
    setSlideProducts("right");
  };

  const moveLeft = () => {
    setSlideProducts("left");
  };

  return (
    <div className="bg-white mt-24 overflow-x-hidden" ref={ref}>
      <H2Title title="Popular products" />
      {!isResponsive ? (
        <div className="flex relative gap-4 ps-4  h-[45rem]">
          <GrFormPrevious
            className={`absolute left-16 top-1/2 -translate-y-1/2 h-12 w-12 z-40 opacity-50 transition-opacity bg-purple-800 rounded-full ${
              slideProduct === "left" || slideProduct === ""
                ? "cursor-not-allowed"
                : "cursor-pointer hover:opacity-100"
            }`}
            onClick={() => moveLeft()}
          />
          <div
            className={`flex gap-12 justify-center absolute h-full w-full top-0 left-0 transition-all ${
              slideProduct === "right" ? "translate-x-full" : ""
            }`}
          >
            {firstSlide.map((product) => (
              <ProductCard key={product._id} item={product} />
            ))}
          </div>
          <div
            className={`flex gap-4 justify-center absolute h-full w-full top-0 left-0 transition-all ${
              slideProduct === "left" || slideProduct === ""
                ? "translate-x-full"
                : "translate-x-0"
            }`}
          >
            {secondSlide.map((product) => (
              <ProductCard key={product._id} item={product} />
            ))}
          </div>
          <GrFormNext
            className={`absolute right-16 top-1/2 -translate-y-1/2 h-12 w-12  z-40 opacity-50 transition-opacity bg-purple-800 rounded-full ${
              slideProduct === "right"
                ? "cursor-not-allowed"
                : "cursor-pointer hover:opacity-100"
            }`}
            onClick={() => moveRight()}
          />
        </div>
      ) : (
        <Carousel>
          {firstSlide.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </Carousel>
      )}
    </div>
  );
});

export default PopularItemsSlider;
