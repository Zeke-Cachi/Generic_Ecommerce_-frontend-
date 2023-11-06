"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/typesAndInterfaces";
import ProductCard from "@/app/Components/ProductCard";
import H2Title from "@/app/Components/H2Title";
import { FaTimes } from "react-icons/fa";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [searchedItem, setSearchedItem] = useState<Product[]>([]);

  useEffect(() => {
    const decodedParams = searchParams.get("data");
    if (decodedParams) {
      const getSearchedItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5500/products/generalsearch?query=${encodeURIComponent(
              decodedParams
            )}`
          );
          setSearchedItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSearchedItems();
    }
  }, [searchParams]);

  return (
    <div className="px-4 my-12">
      <H2Title title={"Your search results"} />
      <div className="flex justify-center gap-4 flex-wrap">
        {searchedItem.length > 0 ? (
          searchedItem.map((item) => <ProductCard item={item} key={item._id} />)
        ) : (
          <div className="flex flex-col items-center gap-4 mb-16">
            <H2Title title={"No items found!"} />
            <FaTimes className="text-purple-800 lg:text-[10rem]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
