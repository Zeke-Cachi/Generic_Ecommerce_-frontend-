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
      const itemToAdd: Product | undefined = state.products.find(
        (item: Product) => item.id === action.payload
      );
      const isItemOnCart: Product | undefined = state.cart.find(
        (item: Product) => item.id === action.payload
      );

      if (!itemToAdd) {
        return state;
      } else {
        if (itemToAdd) {
          if (isItemOnCart) {
            const newCartState = state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity! + 1 }
                : item
            );
            return { ...state, cart: [...newCartState] };
          } else {
            return {
              ...state,
              cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
            };
          }
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
            (item) => item.id !== action.payload
          );
          return { ...state, cart: [...filteredCart] };
        } else {
          const reducedQuantity = state.cart.map((item) => {
            return item.id === action.payload
              ? { ...item, quantity: item.quantity! - 1 }
              : item;
          }) as Product[];

          return { ...state, cart: [...reducedQuantity] };
        }
      } else {
        return state;
      }

    //--------------------------------------------------------------------------

    case TYPES.REMOVE_ALL_ITEMS:
      const deleteFullItem = state.cart.find(
        (item) => item.id === action.payload
      );
      const filterOutItem = state.cart.filter(
        (item) => item.id !== deleteFullItem?.id
      );
      return { ...state, cart: [...filterOutItem] };

    //--------------------------------------------------------------------------

    case TYPES.CLEAR_CART:
      return { ...state, cart: [] };

    default: {
      return state;
    }
  }
}
