import type { CartItem } from "@/types/cartItem";
import React, {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import { addItem, adjustQuantity, removeItem } from "./reducers";

export type State = {
  cartItems: CartItem[];
  totalAmount: number | string;
};

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

export type Action =
  | { type: "addItem"; data: CartItem }
  | { type: "removeItem"; data: CartItem["id"] }
  | {
      type: "adjustQuantity";
      data: { itemId: CartItem["id"]; newQuantity: CartItem["quantity"] };
    };

const reducer = (state: State, action: Action): State => {
  const { type, data } = action;

  switch (type) {
    case "addItem":
      return addItem(state, data);
    case "removeItem":
      return removeItem(state, data);
    case "adjustQuantity":
      return adjustQuantity(state, data);

    default:
      return state;
  }
};

// custom hook to use cart context
export const useCartContext = () => {
  const contextValue = useContext(CartContext);
  if (!contextValue) {
    throw new Error("component must be wrapped inside CartContextProvider");
  }

  return contextValue;
};
