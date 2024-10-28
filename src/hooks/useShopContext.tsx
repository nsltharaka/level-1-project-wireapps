import { ProductContext } from "@/contexts/ProductsContext";
import { useContext } from "react";

export default function useProductContext() {
  const contextValue = useContext(ProductContext);
  if (!contextValue) {
    throw new Error("component must be wrapped inside ShopContextProvider");
  }

  return contextValue;
}
