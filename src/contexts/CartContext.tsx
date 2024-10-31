import type { CartItem } from "@/types/cartItem";
import React, {
  createContext,
  useContext,
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

// custom hook to use cart context
export const useCartContext = () => {
  const contextValue = useContext(CartContext);
  if (!contextValue) {
    throw new Error("component must be wrapped inside CartContextProvider");
  }

  return contextValue;
};

type State = {
  cartItems: CartItem[];
  totalAmount: number | string;
};

type Action =
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

const addItem = (state: State, cartItem: CartItem): State => {
  // item is already in the cart or not
  const existingItem = state.cartItems.find((item) => item.id === cartItem.id);

  // if item is in the cart adjust the quantity with +1 and early return
  if (existingItem) {
    return adjustQuantity(state, { itemId: existingItem.id, newQuantity: 1 });
  }

  // else new item is added to the cartItems
  const updatedCart = [...state.cartItems, cartItem];

  return {
    ...state,
    cartItems: updatedCart,
    totalAmount: calculateTotal(updatedCart),
  };
};

const removeItem = (state: State, itemId: CartItem["id"]): State => {
  const updatedCartItems = state.cartItems.filter((item) => item.id !== itemId);

  return {
    ...state,
    cartItems: updatedCartItems,
    totalAmount: calculateTotal(updatedCartItems),
  };
};

const adjustQuantity = (
  state: State,
  {
    itemId,
    newQuantity,
  }: { itemId: CartItem["id"]; newQuantity: CartItem["quantity"] },
): State => {
  const updatedCartItems = state.cartItems.map((item) => {
    if (item.id !== itemId) return item;
    if (newQuantity < 0 && item.quantity === 1) return item;
    return { ...item, quantity: item.quantity + newQuantity };
  });

  return {
    ...state,
    cartItems: updatedCartItems,
    totalAmount: calculateTotal(updatedCartItems),
  };
};

const calculateTotal: (items: CartItem[]) => State["totalAmount"] = (items) =>
  items
    .map((item) => Number.parseFloat(item.price) * item.quantity)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
