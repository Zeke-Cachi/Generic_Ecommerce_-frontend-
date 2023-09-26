export type Slides = {
  id: number;
  image: string;
};

export type CartContextType = {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  removeAllFromCart: () => void;
  state: CartInitialState;
  totalAmount: number;
};

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

export interface CartInitialState {
  products: Product[];
  cart: Product[];
}
