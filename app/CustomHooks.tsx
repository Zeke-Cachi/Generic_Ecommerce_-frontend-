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
