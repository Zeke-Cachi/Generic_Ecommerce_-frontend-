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

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export type Slides = {
  id: number;
  image: string;
};
