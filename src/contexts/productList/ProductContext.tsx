import { getAllProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useEffect,
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

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
