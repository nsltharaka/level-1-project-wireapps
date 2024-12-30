import type { CartItem } from "@/types/cartItem";
import React, { createContext, type PropsWithChildren } from "react";
import { useProductContext } from "../productList/ProductContext";

export const CartContext = createContext<{
  cartItems: CartItem[];
  setCartItems: (newCartItems: CartItem[]) => void;
} | null>(null);

export function CartContextProvider({ children }: PropsWithChildren) {
  const [cartItems, set] = React.useState<CartItem[]>([]);

  const setCartItems = (newCartItems: CartItem[]) => set(newCartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const { products, adjustQuantity } = useProductContext();
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  const { cartItems, setCartItems } = context;

  const [cartTotal, setCartTotal] = React.useState(0.0);

  const addItem = (itemId: string) => {
    if (cartItems.find((item) => item.productId === itemId)) {
      return;
    }
    setCartItems([...cartItems, { productId: itemId, quantityInCart: 1 }]);
    adjustQuantity(itemId, -1);
  };

  const removeItem = (itemId: string) => {
    const item = cartItems.find((item) => item.productId === itemId);
    setCartItems(cartItems.filter((item) => item.productId !== itemId));
    adjustQuantity(itemId, item!.quantityInCart);
  };

  const addQuantity = (itemId: string, newQuantity: number) => {
    const product = products.find((product) => product.id === itemId);
    const item = cartItems.find((item) => item.productId === itemId);
    if (!product || !item) {
      return;
    }

    if (newQuantity < 0 && item.quantityInCart === 1) {
      return;
    }

    if (product.quantity < newQuantity) {
      alert("Not enough stock");
      return;
    }

    setCartItems(
      cartItems.map((item) => {
        if (item.productId !== itemId) {
          return item;
        }
        return {
          ...item,
          quantityInCart: item.quantityInCart + newQuantity,
        };
      }),
    );
    adjustQuantity(itemId, newQuantity * -1);
  };

  const getCartItems = () => {
    return cartItems.map((item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      )!;
      return {
        ...product,
        quantityInCart: item.quantityInCart,
      };
    });
  };

  React.useEffect(() => {
    const total = getCartItems().reduce(
      (acc, item) => acc + parseFloat(item.price!) * item.quantityInCart,
      0,
    );
    setCartTotal(total);
  }, [cartItems, products]);

  return {
    addItem,
    addQuantity,
    removeItem,
    getCartItems,
    cartItems,
    cartTotal,
  };
}
