"use client";
import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { CartContext } from "@/app/Contexts/CartContext";

//--------------------------------------------------------------------------------------------------------------------------

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [productInfo, setProductInfo] = useState<Product>();
  const { addToCart, removeFromCart, removeAllFromCart } =
    useContext(CartContext);

  //--------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const keyArray = searchParams.getAll("product");
    setProductInfo({
      id: Number(keyArray[0]),
      title: keyArray[1],
      price: Number(keyArray[2]),
      description: keyArray[3],
      category: keyArray[4],
      image: keyArray[5],
      rating: {
        rate: Number(keyArray[6]),
        count: Number(keyArray[7]),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------

  return productInfo?.id === undefined ? (
    <div className="w-full pt-[10rem] text-center h-[50vw]">
      <span className="loading loading-spinner mx-auto w-[10rem]"></span>
    </div>
  ) : (
    <div>
      <div className="flex w-[80vw] h-[70vh] border mx-auto mb-8 shadow-xl bg-gray-100 rounded-xl">
        <div className="w-full p-4 flex flex-col justify-between">
          <div className="relative w-full h-full">
            <Image
              src={productInfo?.image}
              fill={true}
              alt="Product image"
              className="object-contain"
            />
          </div>
          <div className="flex justify-between text-xl">
            <h6>
              Rating:{" "}
              <span
                className={`${
                  productInfo.rating.rate < 2
                    ? "text-red-500"
                    : productInfo.rating.rate > 4
                    ? "text-green-500"
                    : ""
                }`}
              >
                {productInfo.rating.rate}
              </span>
            </h6>
            <h6>
              Category: <span className="italic">{productInfo.category}</span>
            </h6>
          </div>
        </div>

        <div className=" flex flex-col justify-evenly w-full p-4">
          <h2
            className={`${
              productInfo.title.length > 20 ? "text-[2rem]" : "text-[2.5rem]"
            } text-purple-800`}
          >
            {productInfo.title}
          </h2>
          <h3 className="text-[2.5rem] text-start ">
            ${productInfo.price} + tax
          </h3>
          <p>{productInfo.description}</p>
          <p className="italic text-lg">
            Stock:{" "}
            <span
              className={`${
                productInfo.rating.count < 10 ? "text-red-500" : ""
              } non-italic`}
            >
              {productInfo.rating.count}
            </span>
          </p>
          <button
            className="btn bg-purple-800 w-40 mx-auto text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800"
            onClick={() => addToCart(productInfo.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div>
        <h2 className="text-[2rem] mt-4 ms-8">
          You may also be interested in...
        </h2>

        <div className="flex justify-around p-8">
          <div className="transition-all scale-100 hover:scale-105 w-72 h-80 border border-gray-200 bg-gray-100 overflow-hidden rounded-xl shadow-xl flex flex-col items-center">
            <div className="relative h-[50%] w-full mb-4">
              <Image
                src={"/carousel-img/carousel-2.jpg"}
                fill={true}
                alt="optional products"
                className="w-[50%] h-[50%]"
              />
            </div>
            <h4 className="text-xl text-center mb-4">Motorola Edge E4</h4>
            <p className="text-center text-xl mb-4">$500 + tax</p>
            <button className="btn bg-purple-800 w-32 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800">
              Buy now!
            </button>
          </div>

          <div className="transition-all scale-100 hover:scale-105 w-72 h-80 border border-gray-200 bg-gray-100 overflow-hidden rounded-xl shadow-xl0 flex flex-col items-center">
            <div className="relative h-[50%] w-full mb-4">
              <Image
                src={"/carousel-img/carousel-3.jpg"}
                fill={true}
                alt="optional products"
                className="w-[50%] h-[50%]"
              />
            </div>
            <h4 className="text-xl text-center mb-4">Motorola Edge E4</h4>
            <p className="text-center text-xl mb-4">$500 + tax</p>
            <button className="btn bg-purple-800 w-32 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800">
              Buy now!
            </button>
          </div>

          <div className="transition-all scale-100 hover:scale-105 w-72 h-80 border border-gray-200 bg-gray-100 overflow-hidden rounded-xl shadow-xl flex flex-col items-center">
            <div className="relative h-[50%] w-full mb-4">
              <Image
                src={"/carousel-img/carousel-4.jpg"}
                fill={true}
                alt="optional products"
                className="w-[50%] h-[50%]"
              />
            </div>
            <h4 className="text-xl text-center mb-4">Motorola Edge E4</h4>
            <p className="text-center text-xl mb-4">$500 + tax</p>
            <button className="btn bg-purple-800 w-32 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800">
              Buy now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
