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
  updateProducts: (newProducts: Product[]) => void;
}

const ProductContext = createContext<ProductContext | null>(null);
export default function ProductContextProvider({
  children,
}: PropsWithChildren) {
  const [products, setProducts] = useState<Product[]>([]);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  return (
    <ProductContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const value = useContext(ProductContext);
  if (!value) {
    throw new Error("component must be wrapped inside ProductContextProvider");
  }

  const adjustQuantity = (id: string, quantity: number) => {
    value.updateProducts(
      value.products.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity,
          };
        }
        return product;
      }),
    );
  };

  return { products: value.products, adjustQuantity };
}
