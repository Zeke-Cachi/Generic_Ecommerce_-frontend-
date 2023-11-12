"use client";
import Image from "next/image";
import { Product } from "@/typesAndInterfaces";
import Button from "./Button";
import { UseGlobalCart } from "../CustomHooks";

const RelatedProducts: React.FC<{ relatedProduct: Product }> = ({
  relatedProduct,
}) => {
  const { setParams } = UseGlobalCart();

  return (
    <div className="transition-all w-72 h-96 border border-gray-200 bg-gray-100 overflow-hidden rounded-xl shadow-xl flex flex-col items-center px-2 pb-2">
      <div className="h-1/2 mb-4">
        <Image
          src={relatedProduct.image}
          height={500}
          width={500}
          alt="optional products"
          className="object-cover h-3/4"
        />
      </div>
      <div className="h-1/2 grid place-items-center">
        <h4 className="text-xl text-center mb-4">{relatedProduct.title}</h4>
        <p className="text-center text-xl mb-4">
          <span className="font-bold">{relatedProduct.price} + tax</span>
        </p>
        <Button
          title={"Buy now"}
          passedFunctionWithItem={setParams}
          item={relatedProduct}
        />
      </div>
    </div>
  );
};

export default RelatedProducts;
