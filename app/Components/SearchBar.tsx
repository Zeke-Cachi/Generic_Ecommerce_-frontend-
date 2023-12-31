"use client";
import { FaSearch } from "react-icons/fa";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UseGlobalCart } from "../CustomHooks";
import { useGlobalUtils } from "../Contexts/UtilsContext";

const SearchBar: React.FC<{ optionalStyle?: string }> = ({ optionalStyle }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { useWindowWidth } = useGlobalUtils();
  const isResponsive = useWindowWidth();
  const { showSearchBar, setShowSearchBar } = UseGlobalCart();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchURL = `/searchresults?data=${encodeURIComponent(searchInput)}`;
    setSearchInput("");
    setShowSearchBar(false);
    inputRef.current!.value = "";
    router.push(searchURL);
  };

  return (
    <form
      className={`${
        showSearchBar
          ? `flex justify-center gap-4 items-center ${
              isResponsive
                ? "fixed z-30 top-0 w-full h-full bg-black bg-opacity-50"
                : ""
            } animate-fadeInSearchbar`
          : optionalStyle
      }`}
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        ref={inputRef}
        type="text"
        placeholder="search by product name"
        className="p-4 lg:w-[20rem] h-12 border-2 border-gray-200 rounded-lg bg-white"
      />
      {!isResponsive ? (
        <button>
          <FaSearch className="text-gray-400" />
        </button>
      ) : null}
    </form>
  );
};

export default SearchBar;
