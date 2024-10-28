import { CartContext } from "@/contexts/CartContext";
import { useContext } from "react";

const useCartContext = () => {
  const contextValue = useContext(CartContext);
  if (!contextValue) {
    throw new Error("component must be wrapped inside CartContextProvider");
  }

  return contextValue;
};

export default useCartContext;
