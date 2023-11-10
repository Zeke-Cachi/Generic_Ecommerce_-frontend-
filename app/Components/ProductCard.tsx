import React, { useEffect, useState } from "react";
import { useGlobalCart } from "@/app/CustomHooks";
import { Product } from "@/typesAndInterfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import { auth } from "@/firebase";

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

  const handleShoppingCartClick = (item: string) => {
    if (!auth.currentUser) {
      return router.push("/login");
    }
    setIsClicked(() => true);
    addToCart(item);
    setTimeout(() => {
      setIsClicked(() => false);
    }, 300);
  };

  const setParams = () => {
    const encodedImg = encodeURIComponent(item.image);
    const queryParams = `product=${item._id}&product=${item.title}&product=${item.price}&product=${item.description}&product=${encodedImg}&product=${item.quantity}&product=${item.stock}`;
    router.push(`/productDetails?${queryParams}`);
  };

  return (
    <div className="mx-auto group card w-64 max-h-[40rem] shadow-2xl relative border border-gray-200 text-center bg-gray-100 overflow-hidden">
      <FaShoppingCart
        onClick={() => item._id && handleShoppingCartClick(item._id)}
        className={`absolute top-4 right-4 w-8 h-8 text-purple-400 transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
          isClicked ? "animate-clickedCart" : ""
        }`}
      />
      <Image
        src={item.image}
        width={300}
        height={300}
        alt="Product image"
        className="h-1/2 object-cover"
      />
      <div className="card-body min-h-1/2 text-center">
        <h2 className={`card-title text-purple-700 text-[1rem] mx-auto h-1/3`}>
          {shortenedTitle}
        </h2>
        <p className="text-[1.5rem] font-bold mt-2 h-1/3">${item.price}</p>
        <div className="card-actions justify-end h-1/3">
          <Button
            passedFunctionWithItem={setParams}
            item={item}
            title={"BUY NOW"}
            optionalStyle={"mx-auto"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
