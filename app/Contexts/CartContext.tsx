"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { ICartContext, Product } from "../../typesAndInterfaces";
import axios from "axios";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "uuidv4";
import { cartInitialState, CartReducer } from "../Components/Cart/CartReducer";
import { TYPES } from "../Components/Cart/CartActions";
import { useGlobalUser } from "./UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const CartContext = createContext<ICartContext>({
  product: [],
  setProduct: () => {},
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
  handleProductCreation: () => {},
});

//------------------------------------- / STATES / -----------------------------------------------------------------------------

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { userData, setUserData } = useGlobalUser();

  const [product, setProduct] = useState<Product[]>([]);

  const [state, dispatch] = useReducer(CartReducer, cartInitialState);

  const [totalAmount, setTotalAmount] = useState(0);

  const [productImage, setProductImage] = useState<File | null>(null);

  //----------------------------------- / REDUCER FUNCTIONS / -------------------------------------------------------------------------------

  const initializeState = (product: Product[]) => {
    dispatch({ type: TYPES.INITIALIZE_STATE, payload: product });
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
    const totalValue = state.cart.reduce(
      (acc, item) => (acc = acc + item.quantity! * item.price),
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
      setProduct((prev) => ({ ...prev, image: uploadURL }));
    };
    uploadProductImageToFirebase();
  }, [productImage]);

  //------------------------------------- / FUNCTIONS / -----------------------------------------------------------------------------

  const updateProductImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductImage(() => e.target.files![0]);
  };

  const handleProductCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData._id) {
      const productPayload = { ...product, userId: userData._id };
      try {
        const response = await axios.post(
          "http://localhost:5500/products/create",
          productPayload
        );
        setUserData((prev) => ({
          ...prev,
          uploadedProducts: [...response.data[1].uploadedProducts],
        }));
        toast.success("Product successfully uploaded!");
        router.push("/profile");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        product,
        setProduct,
        addToCart,
        removeFromCart,
        completelyRemoveItem,
        clearCart,
        state,
        totalAmount,
        updateProductImg,
        handleProductCreation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//--------------------------------------- / USEGLOBALCART CUSTOM HOOK / ---------------------------------------------------------------------------

export const useGlobalCart = () => {
  return useContext(CartContext);
};

//-------------------------------------- / USEWINDOWHEIGHT CUSTOM HOOK / ----------------------------------------------------------------------------

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
