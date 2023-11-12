"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { UseGlobalCart } from "@/app/CustomHooks";
import Button from "@/app/Components/Button";
import H2Title from "@/app/Components/H2Title";
import RelatedProducts from "@/app/Components/RelatedProducts";

//--------------------------------------------------------------------------------------------------------------------------

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const { addToCart, product } = UseGlobalCart();
  const [productInfo, setProductInfo] = useState<Product>();
  const [relatedProductsData] = useState<Product[]>(product.slice(3, 6));
  const [rating] = useState(Math.floor(Math.random() * 10) + 1);

  //--------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const keyArray = searchParams.getAll("product");
    setProductInfo({
      _id: keyArray[0],
      title: keyArray[1],
      price: Number(keyArray[2]),
      description: keyArray[3],
      image: keyArray[4],
      quantity: Number(keyArray[5]),
      stock: Number(keyArray[6]),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  //--------------------------------------------------------------------------------------------------------------------------

  return productInfo?._id === undefined ? (
    <div className="w-full pt-[10rem] text-center h-[50vw] bg-white">
      <span className="loading loading-spinner mx-auto w-[10rem]"></span>
    </div>
  ) : (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row w-[20rem] h-[50rem] lg:w-[80vw] lg:h-[70vh] border mx-auto mb-8 shadow-xl bg-gray-100 rounded-xl">
        <div className="w-full h-full p-4 flex flex-col justify-between">
          <div className="relative w-full h-full">
            <Image
              src={productInfo.image}
              fill={true}
              alt="Product image"
              className="object-contain"
            />
          </div>
          <div className="flex justify-between text-xl mt-2 lg:mt-0">
            <h6>
              Rating:{" "}
              <span
                className={`${
                  rating < 2
                    ? "text-red-500"
                    : rating > 4
                    ? "text-green-500"
                    : ""
                } my-2 lg:my-0`}
              >
                {rating}
              </span>
            </h6>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:justify-evenly w-full p-4">
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
                productInfo.stock < 10 ? "text-red-500" : ""
              } non-italic`}
            >
              {productInfo.stock}
            </span>
          </p>
          <Button
            passedFunctionWithId={addToCart}
            title={"ADD TO CART"}
            _id={productInfo._id}
            optionalStyle={"mx-auto"}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

      <div>
        <H2Title title={"You may also be interested in..."} />

        <div className="flex flex-col gap-2 lg:flex-row lg:gap-0 justify-around p-8">
          {relatedProductsData.map((relatedProduct) => (
            <RelatedProducts
              relatedProduct={relatedProduct}
              key={relatedProduct._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
