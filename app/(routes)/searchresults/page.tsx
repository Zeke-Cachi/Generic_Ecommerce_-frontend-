"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/typesAndInterfaces";
import ProductCard from "@/app/Components/ProductCard";
import H2Title from "@/app/Components/H2Title";
import { FaTimes } from "react-icons/fa";
import { SERVER_URL } from "@/app/functions";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [searchedItem, setSearchedItem] = useState<Product[]>([]);
  const [isSearchFetching, setIsSearchFetching] = useState<boolean>(false);

  useEffect(() => {
    const decodedParams = searchParams.get("data");
    if (decodedParams) {
      const getSearchedItems = async () => {
        try {
          setIsSearchFetching(() => true);
          const response = await axios.get(
            `${SERVER_URL}/products/generalsearch?query=${encodeURIComponent(
              decodedParams
            )}`
          );
          setSearchedItem(response.data);
          setIsSearchFetching(() => false);
        } catch (error) {
          console.log(error);
        }
      };
      getSearchedItems();
    }
  }, [searchParams]);

  return (
    <div className="px-4 my-12 bg-white">
      <H2Title title={"Your search results"} />
      {isSearchFetching ? (
        <div className="w-full grid place-items-center">
          <span className="loading loading-spinner text-gray-300 w-1/6"></span>
        </div>
      ) : (
        <div className="flex justify-center gap-4 flex-wrap">
          {searchedItem.length > 0 ? (
            searchedItem.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-4 mb-16">
              <H2Title title={"No items found!"} />
              <FaTimes className="text-purple-800 lg:text-[10rem]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
