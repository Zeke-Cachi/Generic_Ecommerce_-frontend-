//ALPHABETICALLY ORDERED

export interface ButtonProps {
  passedFunction?: (id?: number) => void;
  title: string;
  id?: number;
  optionalStyle?: string;
}

export type CartContextType = {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (id?: number) => void;
  removeFromCart: (id: number) => void;
  completelyRemoveItem: (id?: number) => void;
  clearCart: () => void;
  state: CartInitialState;
  totalAmount: number;
};

export interface CartInitialState {
  products: Product[];
  cart: Product[];
}

export interface IUserContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  handleInput: <T>(
    e: React.ChangeEvent<HTMLInputElement>,
    setterFunction: React.Dispatch<React.SetStateAction<T>>
  ) => void;
  handleRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePasswordReset: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
}

export type Slides = {
  id: number;
  image: string;
};

export interface UserData {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  profileImg: string;
  password?: string;
}
