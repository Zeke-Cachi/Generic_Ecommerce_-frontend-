"use client";
import React, { createContext, useState, useEffect, useReducer } from "react";
import { CartContextType, Product } from "../../typesAndInterfaces";
import axios from "axios";
import { cartInitialState, CartReducer } from "../Components/Cart/CartReducer";
import { TYPES } from "../Components/Cart/CartActions";

export const CartContext = createContext<CartContextType>({
  product: [],
  setProduct: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  state: {
    products: [],
    cart: [],
  },
  totalAmount: 0,
});

//-----------------------------------------------------------------------------------------------------------------

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<Product[]>([]);

  const [state, dispatch] = useReducer(CartReducer, cartInitialState);

  const [totalAmount, setTotalAmount] = useState(0);

  //------------------------------------------------------------------------------------------------------------------

  const initializeState = (product: Product[]) => {
    dispatch({ type: TYPES.INITIALIZE_STATE, payload: product });
  };

  const addToCart = (id: number) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: TYPES.REMOVE_ITEM, payload: id });
  };

  const removeAllFromCart = () => {
    dispatch({ type: TYPES.REMOVE_ALL_ITEMS });
  };

  //------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      response
        ? (setProduct(response.data), initializeState(response.data))
        : null;
    };
    getProducts();
  }, []);

  useEffect(() => {
    const totalValue = state.cart.reduce(
      (acc, item) => (acc = acc + item.quantity! * item.price),
      0
    );
    setTotalAmount(() => totalValue);
  }, [state]);

  //------------------------------------------------------------------------------------------------------------------

  return (
    <CartContext.Provider
      value={{
        product,
        setProduct,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        state,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
