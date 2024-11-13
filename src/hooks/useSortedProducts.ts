import { useProductListContext } from "@/contexts/productList/ProductListContext";
import type { Product } from "@/types/product";

export type DefaultMapper = keyof typeof defaultMappers;

export default function useSortedProducts(products: Product[]) {
  const { selectedSortStrategy } = useProductListContext();
  return {
    products: [...products].sort(defaultMappers[selectedSortStrategy]),
    activeMapper: selectedSortStrategy,
  };
}

export const defaultMappers = {
  none: () => 0,

  "price low to high": (a: Product, b: Product) =>
    Number.parseFloat(a.price) - Number.parseFloat(b.price),

  "price high to low": (a: Product, b: Product) =>
    Number.parseFloat(b.price) - Number.parseFloat(a.price),
};
