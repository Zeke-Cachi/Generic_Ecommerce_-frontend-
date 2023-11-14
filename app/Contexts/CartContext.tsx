"use client";
import React, { createContext, useState, useEffect, useReducer } from "react";
import { ICartContext, Product } from "../../typesAndInterfaces";
import axios from "axios";
import { auth, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "uuidv4";
import { cartInitialState, CartReducer } from "../Components/Cart/CartReducer";
import { TYPES } from "../Components/Cart/CartActions";
import { UseGlobalUser } from "../CustomHooks";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "../functions";

export const CartContext = createContext<ICartContext>({
  product: [],
  setProduct: () => {},
  initializeState: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  completelyRemoveItem: () => {},
  clearCart: () => {},
  state: {
    products: [],
    cart: [],
  },
  totalAmount: 0,
  updateProductImg: () => {},
  setParams: () => {},
  showSearchBar: false,
  setShowSearchBar: () => {},
  storeNewProduct: {
    title: "",
    price: 1,
    description: "",
    image: "",
    quantity: 1,
    stock: 1,
  },
  setStoreNewProduct: () => {},
});

//------------------------------------- / STATES / -----------------------------------------------------------------------------

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { userData } = UseGlobalUser();

  const [product, setProduct] = useState<Product[]>([]);

  const [state, dispatch] = useReducer(CartReducer, cartInitialState);

  const [totalAmount, setTotalAmount] = useState(0);

  const [productImage, setProductImage] = useState<File | null>(null);

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const [storeNewProduct, setStoreNewProduct] = useState<Product>({
    title: "",
    price: 1,
    description: "",
    image: "",
    quantity: 1,
    stock: 1,
  });

  //----------------------------------- / REDUCER FUNCTIONS / -------------------------------------------------------------------------------

  const initializeState = (item: Product[], option: string) => {
    option === "cart"
      ? dispatch({ type: TYPES.INITIALIZE_CART, payload: item })
      : dispatch({ type: TYPES.INITIALIZE_PRODUCTS, payload: item });
  };

  const addToCart = (id?: string) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: TYPES.REMOVE_ITEM, payload: id });
  };

  const completelyRemoveItem = (id?: string) => {
    dispatch({ type: TYPES.REMOVE_ALL_ITEMS, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  //------------------------------------- / USEEFFECTS / -----------------------------------------------------------------------------

  useEffect(() => {
    console.log(storeNewProduct);
  }, [storeNewProduct]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        response.data.length > 0 && initializeState(response.data, "products");
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const uploadCartItems = async () => {
      const postData = { email: auth.currentUser?.email, cart: state.cart };
      try {
        const response = await axios.post(
          `${SERVER_URL}/users/savecart`,
          postData
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (auth.currentUser?.email) {
      uploadCartItems();
    }
  }, [state.cart, userData._id]);

  useEffect(() => {
    const totalValue = state.cart.reduce(
      (acc: number, item: Product) => (acc = acc + item.quantity! * item.price),
      0
    );
    setTotalAmount(() => totalValue);
  }, [state]);

  useEffect(() => {
    const uploadProductImageToFirebase = async () => {
      if (productImage === null) return null;
      const imageRef = ref(
        storage,
        `productImage/${productImage.name}${uuid()}`
      );
      await uploadBytes(imageRef, productImage);
      const uploadURL = await getDownloadURL(imageRef);
      setStoreNewProduct((prev) => ({ ...prev, image: uploadURL }));
    };
    uploadProductImageToFirebase();
  }, [productImage]);

  //------------------------------------- / FUNCTIONS / -----------------------------------------------------------------------------

  const updateProductImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductImage(() => e.target.files![0]);
  };

  const setParams = (item: Product) => {
    const encodedImg = encodeURIComponent(item.image);
    const queryParams = `product=${item._id}&product=${item.title}&product=${item.price}&product=${item.description}&product=${encodedImg}&product=${item.quantity}&product=${item.stock}`;
    router.push(`/productDetails?${queryParams}`);
  };

  return (
    <CartContext.Provider
      value={{
        product,
        setProduct,
        initializeState,
        addToCart,
        removeFromCart,
        completelyRemoveItem,
        clearCart,
        state,
        totalAmount,
        updateProductImg,
        setParams,
        showSearchBar,
        setShowSearchBar,
        storeNewProduct,
        setStoreNewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
