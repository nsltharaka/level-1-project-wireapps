import { useProductContext } from "@/contexts/ProductContext";
import type { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export type Predicate = (item: Product) => boolean;

export default function useFilteredProducts(searchKeyword: string) {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(() => products);
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
    if (searchKeyword) {
      addFilter(
        "withSearchKeyword",
        defaultFilters.withSearchKeyword(searchKeyword),
      );
    } else {
      removeFilter("withSearchKeyword");
    }
  }, [searchKeyword]);

  useEffect(() => {
    setFilteredProducts(
      filters.size === 0
        ? products
        : products.filter(buildFilterFunction(...filters.values())),
    );
  }, [filters, products]);

  return {
    filteredProducts,
    addFilter,
    removeFilter,
    clearAllFilters,
  };
}

const buildFilterFunction = (...filters: Predicate[]) => {
  return (item: Product) => filters.every((predicate) => predicate(item));
};

export const defaultFilters = {
  withSearchKeyword: (key: string) => (item: Product) => {
    const lowerKey = key.toLowerCase();
    const searchableText = `${item.name.toLowerCase()} ${item.description.toLowerCase()} ${item.colour}`;
    return searchableText.includes(lowerKey);
  },

  withBrand: (brandName: string) => (item: Product) => {
    const itemBrand = item.name.split(" ")[0];
    return itemBrand.toLowerCase() === brandName.toLowerCase();
  },

  withColor: (colorName: string) => (item: Product) => {
    return item.colour.toLowerCase() === colorName.toLowerCase();
  },
};
