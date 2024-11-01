import { useProductContext } from "@/contexts/ProductContext";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

export type Predicate = (item: Product) => boolean;

export default function useFilteredProducts(searchKeyword: string) {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(() => products);
  const [filters, setFilters] = useState<Map<string, Predicate>>(new Map());

  const addFilter = (
    filterName: keyof typeof defaultFilters,
    filter: Predicate,
  ) => {
    setFilters((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(filterName, filter);
      return newMap;
    });
  };

  const removeFilter = (filterName: keyof typeof defaultFilters) => {
    setFilters((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(filterName);
      return newMap;
    });
  };

  const clearAllFilters = () => {
    setFilters(new Map());
  };

  useEffect(() => {
    setFilteredProducts(products.filter(withSearchKeyword(searchKeyword)));
  }, [searchKeyword]);

  useEffect(() => {
    console.log("active filters : ", filters);
  }, [filters.size]);

  return {
    filteredProducts,
    addFilter,
    removeFilter,
    clearAllFilters,
  };
}

const withSearchKeyword = (key: string) => (item: Product) => {
  if (!key) return true;
  return item.name
    .toLowerCase()
    .concat(" ", item.description.toLowerCase(), " ", item.colour, " ")
    .includes(key.toLowerCase());
};

export const defaultFilters = {
  withBrand: (brandName: string) => (item: Product) => {
    if (brandName === "any") return true;
    const itemBrand = item.name.substring(0, item.name.indexOf(" "));
    return itemBrand.toLowerCase() === brandName.toLowerCase();
  },

  withColor: (colorName: string) => {
    if (colorName === "any") return () => true;
    return (item: Product) => item.colour === colorName;
  },
};
