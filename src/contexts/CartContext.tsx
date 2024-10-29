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
      value={useReducer(
        reducer,
        null,
        (): State => ({
          cartItems: [],
          totalAmount: 0,
        }),
      )}
    >
      {children}
    </CartContext.Provider>
  );
}

type State = {
  cartItems: CartItem[];
  totalAmount: number;
};

type Action =
  | { type: "addItem"; data: CartItem }
  | { type: "removeItem"; data: CartItem["id"] };

const reducer = (state: State, action: Action): State => {
  const { type, data } = action;

  switch (type) {
    case "addItem":
      return addItem(state, data);
    case "removeItem":
      return removeItem(state, data);

    default:
      return state;
  }
};

const addItem = (state: State, data: CartItem) => {
  const existingItemIndex = state.cartItems.findIndex(
    (item) => item.id === data.id,
  );

  let updatedCart;
  if (existingItemIndex >= 0) {
    updatedCart = state.cartItems.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  } else {
    updatedCart = [...state.cartItems, data];
  }

  return {
    ...state,
    cartItems: updatedCart,
  };
};

const removeItem = (state: State, data: CartItem["id"]) => {
  return state;
};
