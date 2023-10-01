"use client";
import React, { useState, useEffect, useContext } from "react";
import { Product } from "@/typesAndInterfaces";
import { CartContext } from "../Contexts/CartContext";
import ProductCard from "./ProductCard";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const PopularItemsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popularItems, setPopularItems] = useState<Product[]>([]);
  const { product } = useContext(CartContext);

  useEffect(() => {
    const slicedArr = product.sort(() => Math.random() - 0.5).slice(0, 10);
    setPopularItems(slicedArr);
  }, [product]);

  const renderSlide = (start: number, end: number) => {
    return popularItems
      .slice(start, end)
      .map((item, index) => <ProductCard key={index} item={item} />);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 5 : 0));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 5 : 0));
  };

  return (
    <>
      <h2 className="text-[2.5rem] px-4">Popular Items</h2>
      <div className="flex w-full gap-4 px-4 relative">
        <GrFormPrevious
          onClick={goToPrevSlide}
          className="h-12 w-12 absolute top-[50%] left-8 z-20 rounded-full bg-purple-100 cursor-pointer opacity-50 hover:opacity-100"
        />
        <div className="flex justify-between w-full">
          {renderSlide(currentIndex, currentIndex + 5)}
        </div>
        <GrFormNext
          onClick={goToNextSlide}
          className="h-12 w-12 absolute top-[50%] right-8 z-20 rounded-full bg-purple-100 cursor-pointer opacity-50 hover:opacity-100"
        />
      </div>
    </>
  );
};

export default PopularItemsSlider;
