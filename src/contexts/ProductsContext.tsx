import data from "@/data/sample.json";
import type { Product } from "@/types/product";
import { createContext, useState, type PropsWithChildren } from "react";

interface ShopContextType {
  products: Product[];
}

export const ProductContext = createContext<ShopContextType | null>(null);

export default function ProductContextProvider({
  children,
}: PropsWithChildren) {
  const [products, setProducts] = useState(() => data);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
