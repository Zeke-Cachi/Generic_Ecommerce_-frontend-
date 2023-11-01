import { useContext, useState, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { CartContext } from "./Contexts/CartContext";

export const useGlobalUser = () => {
  return useContext(UserContext);
};

export const useGlobalCart = () => {
  return useContext(CartContext);
};

export const useWindowHeight = () => {
  const [checkHeight, setCheckHeight] = useState<number>(0);

  useEffect(() => {
    const setState = () => {
      setCheckHeight(window.scrollY);
    };

    window.addEventListener("scroll", setState);
    return () => window.removeEventListener("scroll", setState);
  }, []);

  return checkHeight;
};
