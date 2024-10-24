import { ShopContext } from "@/contexts/shopContext";
import { useContext } from "react";

export default function useShopContext() {
  const contextValue = useContext(ShopContext);
  if (!contextValue) {
    throw new Error("component must be wrapped inside ShopContextProvider");
  }

  return contextValue;
}
