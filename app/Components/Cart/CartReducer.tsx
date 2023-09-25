import { TYPES } from "./CartActions";
import { Product, CartInitialState } from "@/typesAndInterfaces";

export const cartInitialState: CartInitialState = {
  products: [],
  cart: [],
};

export function CartReducer(state: CartInitialState, action: any) {
  switch (action.type) {
    case TYPES.INITIALIZE_STATE: {
      return { ...state, products: action.payload };
    }

    //--------------------------------------------------------------------------
    case TYPES.ADD_TO_CART: {
      let itemToAdd: Product | undefined = state.products.find(
        (item: Product) => item.id === action.payload
      );

      if (itemToAdd) {
        if (!itemToAdd.quantity) {
          const newItem = { ...itemToAdd, quantity: 1 };
          return { ...state, cart: [...state.cart, newItem] };
        } else {
          return {
            ...state,
            cart: [{ ...itemToAdd, quantity: itemToAdd.quantity + 1 }],
          };
        }
      }
    }

    //--------------------------------------------------------------------------

    case TYPES.REMOVE_ITEM:
      const itemToDelete = state.cart.find(
        (item: Product) => item.id === action.payload
      );
      if (itemToDelete) {
        if (itemToDelete.quantity === 1) {
          const filteredCart = state.cart.filter(
            (item) => item.id !== itemToDelete.id
          );
          return { ...state, cart: [...filteredCart] };
        } else {
          const reducedQuantity = state.cart.map((item) => {
            if (item.quantity) {
              return item.id === action.payload
                ? (item.quantity = item.quantity - 1)
                : null;
            } else {
              return item;
            }
          }) as Product[];

          return { ...state, cart: [...reducedQuantity] };
        }
      }

    default: {
      return state;
    }
  }
}
