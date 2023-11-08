import { useContext, useState, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { CartContext } from "./Contexts/CartContext";

//---------------------------------------------------------------------------

export const useGlobalUser = () => {
  return useContext(UserContext);
};

//---------------------------------------------------------------------------

export const useGlobalCart = () => {
  return useContext(CartContext);
};

//---------------------------------------------------------------------------

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

//---------------------------------------------------------------------------

export const useWindowWidth = () => {
  const [isResponsive, setIsResponsive] = useState<boolean>(
    window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isResponsive;
};
