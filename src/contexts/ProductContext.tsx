import data from "@/data/sample.json";
import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

interface ProductContext {
  products: Product[];
}

const ProductContext = createContext<ProductContext | null>(null);
export default function ProductContextProvider({
  children,
}: PropsWithChildren) {
  const [products] = useState(() => data);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const value = useContext(ProductContext);
  if (!value) {
    throw new Error("component must be wrapped inside ProductContextProvider");
  }
  return value;
}
