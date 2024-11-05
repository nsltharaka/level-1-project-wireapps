import type { Product } from "@/types/product";
import { useState } from "react";

export default function useSortedProducts(products: Product[]) {
  const [activeMapper, setActiveMapper] =
    useState<keyof typeof defaultMappers>("none");
  return {
    products: [...products].sort(defaultMappers[activeMapper]),
    activeMapper,
    setActiveMapper,
  };
}

export const defaultMappers = {
  none: () => 0,

  "price low to high": (a: Product, b: Product) =>
    Number.parseFloat(a.price) - Number.parseFloat(b.price),

  "price high to low": (a: Product, b: Product) =>
    Number.parseFloat(b.price) - Number.parseFloat(a.price),
};
