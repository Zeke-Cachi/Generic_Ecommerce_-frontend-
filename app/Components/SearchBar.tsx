"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowWidth } from "../CustomHooks";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();
  const isResponsive = useWindowWidth();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchURL = `/searchresults?data=${encodeURIComponent(searchInput)}`;
    router.push(searchURL);
  };

  return (
    <form
      className={`flex justify-center gap-4 items-center ${
        isResponsive ? "absolute top-40 left-16" : ""
      }`}
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder="search by product name"
        className="ps-4 w-40 lg:w-[20rem] h-12 border-2 border-gray-200 rounded-lg"
      />
      <button>
        <FaSearch className="text-gray-400" />
      </button>
    </form>
  );
};

export default SearchBar;
