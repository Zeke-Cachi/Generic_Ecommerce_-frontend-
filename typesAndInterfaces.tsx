//ALPHABETICALLY ORDERED

export interface ButtonProps {
  passedFunction?: () => void;
  passedFunctionWithId?: (_id: string) => void;
  passedFunctionWithItem?: (item: Product) => void;
  title: string;
  _id?: string;
  item?: Product;
  optionalStyle?: string;
}

export type ICartContext = {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  initializeState: (item: Product[], option: string) => void;
  addToCart: (_id?: string) => void;
  removeFromCart: (_id: string) => void;
  completelyRemoveItem: (_id?: string) => void;
  clearCart: () => void;
  state: CartInitialState;
  totalAmount: number;
  updateProductImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setParams: (item: Product) => void;
};

export interface CartInitialState {
  products: Product[];
  cart: Product[];
}

export interface IError {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

export interface IUserContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  handleInput: <T>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setterFunction: React.Dispatch<React.SetStateAction<T>>
  ) => void;
  handleRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePasswordReset: (e: React.FormEvent<HTMLFormElement>) => void;
  updateProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logOut: () => void;
  handleProductCreation: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Product {
  userId?: string;
  _id?: string;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  stock: number;
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
  repeatPassword?: string;
  cart: Product[];
  uploadedProducts: Product[];
}
