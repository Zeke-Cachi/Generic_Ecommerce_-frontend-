"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/typesAndInterfaces";
import ProductCard from "@/app/Components/ProductCard";

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
          console.log(response.data);
          setSearchedItem(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSearchedItems();
    }
  }, [searchParams]);

  return (
    searchedItem &&
    searchedItem.map((item) => <ProductCard item={item} key={item._id} />)
  );
};

export default SearchResults;
