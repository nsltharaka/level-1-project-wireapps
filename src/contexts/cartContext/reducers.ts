import type { CartItem } from "@/types/cartItem";
import type { State } from "./CartContext";

export const addItem = (state: State, cartItem: CartItem): State => {
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

export const removeItem = (state: State, itemId: CartItem["id"]): State => {
  const updatedCartItems = state.cartItems.filter((item) => item.id !== itemId);

  return {
    ...state,
    cartItems: updatedCartItems,
    totalAmount: calculateTotal(updatedCartItems),
  };
};

export const adjustQuantity = (
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

export const calculateTotal: (items: CartItem[]) => State["totalAmount"] = (
  items,
) =>
  items
    .map((item) => Number.parseFloat(item.price) * item.quantity)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
