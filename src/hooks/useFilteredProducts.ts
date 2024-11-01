import { useProductContext } from "@/contexts/ProductContext";
import type { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export type Predicate = (item: Product) => boolean;

export default function useFilteredProducts() {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(() => products);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filters, setFilters] = useState<Map<string, Predicate>>(new Map());

  const addFilter = useCallback(
    (filterName: keyof typeof defaultFilters, filter: Predicate) => {
      setFilters((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.set(filterName, filter);
        return newMap;
      });
    },
    [],
  );

  const removeFilter = useCallback(
    (filterName: keyof typeof defaultFilters) => {
      setFilters((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.delete(filterName);
        return newMap;
      });
    },
    [],
  );

  const clearAllFilters = useCallback(() => {
    setFilters(new Map());
  }, []);

  useEffect(() => {
    if (!searchKeyword) return;
    addFilter(
      "withSearchKeyword",
      defaultFilters.withSearchKeyword(searchKeyword),
    );

    return () => removeFilter("withSearchKeyword");
  }, [searchKeyword]);

  useEffect(() => {
    if (filters.size === 0) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter(buildFilterFunction(...filters.values())),
    );
  }, [filters.size, searchKeyword]);

  return {
    filteredProducts,
    setSearchKeyword,
    addFilter,
    removeFilter,
    clearAllFilters,
  };
}

const buildFilterFunction = (...filters: Predicate[]) => {
  if (filters.length === 0) return () => true;
  return filters.reduce(
    (predicateA, predicateB) => {
      return (item) => predicateA(item) && predicateB(item);
    },
    () => true,
  );
};

export const defaultFilters = {
  withSearchKeyword: (key: string) => (item: Product) => {
    if (!key) return true;
    return item.name
      .toLowerCase()
      .concat(" ", item.description.toLowerCase(), " ", item.colour, " ")
      .includes(key.toLowerCase());
  },

  withBrand: (brandName: string) => (item: Product) => {
    if (brandName === "any") return true;
    const itemBrand = item.name.substring(0, item.name.indexOf(" "));
    return itemBrand.toLowerCase() === brandName.toLowerCase();
  },

  withColor: (colorName: string) => {
    if (colorName === "any") return () => true;
    return (item: Product) =>
      item.colour.toLowerCase() === colorName.toLowerCase();
  },
};
