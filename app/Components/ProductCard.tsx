import React, { useEffect, useState } from "react";
import { useGlobalCart } from "../Contexts/CartContext";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";

const ProductCard: React.FC<{ item: Product }> = ({ item }) => {
  const [shortenedTitle, setShortenedTitle] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { addToCart } = useGlobalCart();

  useEffect(() => {
    if (item.title.length > 20) {
      const shortened = `${item.title.slice(0, 20)}...`;
      setShortenedTitle(shortened);
    } else {
      setShortenedTitle(item.title);
    }
  }, [item]);

  const handleShoppingCartClick = (item: number) => {
    setIsClicked(() => true);
    addToCart(item);
    setTimeout(() => {
      setIsClicked(() => false);
    }, 300);
  };

  const setParams = () => {
    const queryParams = `product=${item.id}&product=${item.title}&product=${item.price}&product=${item.description}&product=${item.category}&product=${item.image}&product=${item.rating.rate}&product=${item.rating.count}`;
    router.push(`/productDetails?${queryParams}`);
  };

  return (
    <div className="group card w-64 max-h-[40rem] p-2 shadow-2xl relative border border-gray-200 text-center bg-gray-100">
      <FaShoppingCart
        onClick={() => handleShoppingCartClick(item.id)}
        className={`absolute top-4 right-4 w-8 h-8 text-purple-400 transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
          isClicked ? "animate-clickedCart" : ""
        }`}
      />
      <Image
        src={item.image}
        width={300}
        height={300}
        alt="Product image"
        className="h-full object-contain"
      />
      <div className="card-body">
        <h2 className={`card-title text-purple-700 text-[1rem]`}>
          {shortenedTitle}
        </h2>
        <p className="text-[1.5rem] font-bold mt-2">${item.price}</p>
        <div className="card-actions justify-end">
          <Button
            passedFunction={setParams}
            title={"BUY NOW"}
            optionalStyle={"mx-auto"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
