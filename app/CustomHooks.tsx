"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { CartContext } from "./Contexts/CartContext";

//---------------------------------------------------------------------------

export const UseGlobalUser = () => {
  return useContext(UserContext);
};

//---------------------------------------------------------------------------

export const UseGlobalCart = () => {
  return useContext(CartContext);
};

//---------------------------------------------------------------------------

export const UseWindowHeight = () => {
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

export const UseWindowWidth = () => {
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

//CAMBIAR LAS RUTAS API POR genericecommerce-backend-production.up.railway.app Y SU CORRESPONDIENTE ENDPOINT, Y VER DE ENCRIPTAR ESO
