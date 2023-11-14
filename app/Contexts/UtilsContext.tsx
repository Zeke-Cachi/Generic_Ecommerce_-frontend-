"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { IUtilsContext } from "@/typesAndInterfaces";

export const UtilsContext = createContext<IUtilsContext>({
  useWindowHeight: () => 0,
  useWindowWidth: () => false,
  isClient: false,
});

const UtilsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isResponsive, setIsResponsive] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    setIsResponsive(window.innerWidth <= 1024);
  }, []);

  const useWindowHeight = () => {
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

  const useWindowWidth = () => {
    useEffect(() => {
      if (isClient) {
        const handleResize = () => {
          setIsResponsive(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, [isClient]);

    return isResponsive;
  };

  //---------------------------------------------------------------------------

  return (
    <UtilsContext.Provider
      value={{ useWindowHeight, useWindowWidth, isClient }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export default UtilsProvider;

//---------------------------------------------------------------------------

export const useGlobalUtils = () => {
  return useContext(UtilsContext);
};
