import type { CartItem } from "@/types/cartItem";
import React, {
  createContext,
  useReducer,
  type PropsWithChildren,
} from "react";

export const CartContext = createContext<
  [State, React.Dispatch<Action>] | null
>(null);

export default function CartContextProvider({ children }: PropsWithChildren) {
  return (
    <CartContext.Provider
      value={useReducer(reducer, null, () => ({
        cartItems: [],
      }))}
    >
      {children}
    </CartContext.Provider>
  );
}

type State = {
  cartItems: CartItem[];
  totalAmount: number;
};

type Action = {
  type: "addItem";
  data?: CartItem;
};

const reducer = (state: State, action: Action): State => {
  const { type, data } = action;

  switch (type) {
    case "addItem":
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === data?.id,
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...state.cartItems, data!];
      }

      return {
        ...state,
        cartItems: updatedCart,
      };

    default:
      return state;
  }
};
