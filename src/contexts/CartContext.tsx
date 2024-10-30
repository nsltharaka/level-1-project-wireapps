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
  totalAmount: number | string;
};

type Action =
  | { type: "addItem"; data: CartItem }
  | { type: "removeItem"; data: CartItem["id"] }
  | { type: "adjustQuantity"; data: { itemId: CartItem['id'], newQuantity: CartItem['quantity'] } }

const reducer = (state: State, action: Action): State => {
  const { type, data } = action;

  switch (type) {
    case "addItem":
      return addItem(state, data);
    case "removeItem":
      return removeItem(state, data);
    case "adjustQuantity":
      return adjustQuantity(state, data)

    default:
      return state;
  }
};

const addItem = (state: State, cartItem: CartItem): State => {
  // item is already in the cart or not
  const existingItem = state.cartItems.find(
    (item) => item.id === cartItem.id,
  );

  // if item is in the cart adjust the quantity with +1 and early return
  if (existingItem) {
    return adjustQuantity(state, { itemId: existingItem.id, newQuantity: 1 })
  }

  // else new item is added to the cartItems
  const updatedCart = [...state.cartItems, cartItem];

  return {
    ...state,
    cartItems: updatedCart,
    totalAmount: calculateTotal(updatedCart)
  };
};

const removeItem = (state: State, data: CartItem["id"]): State => {
  return state;
};

const adjustQuantity = (state: State, { itemId, newQuantity }: { itemId: CartItem['id'], newQuantity: CartItem['quantity'] }): State => {

  if (newQuantity < 1) return state

  const updatedCartItems = state.cartItems
    .map(item => item.id === itemId ? { ...item, quantity: item.quantity + newQuantity } : item)

  return {
    ...state,
    cartItems: updatedCartItems,
    totalAmount: calculateTotal(updatedCartItems)
  }
}

const calculateTotal: (items: CartItem[]) => State['totalAmount'] = (items: CartItem[]) => items
  .map(item => Number.parseFloat(item.price) * item.quantity)
  .reduce((a, b) => a + b, 0)
  .toFixed(2)