import data from "@/data/sample.json";
import type { Product } from "@/types/product";
import { createContext, useState, type PropsWithChildren } from "react";

interface ShopContextType {
  products: Product[];
}

export const ShopContext = createContext<ShopContextType | null>(null);

export default function ShopContextProvider({ children }: PropsWithChildren) {
  const [products] = useState(() => data);

  return (
    <ShopContext.Provider value={{ products }}>{children}</ShopContext.Provider>
  );
}
