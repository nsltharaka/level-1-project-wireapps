import type { DefaultMapper } from "@/hooks/useSortedProducts";
import React, {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export const brands = ["any", "Nike", "Puma"] as const;
export const colors = ["any", "Blue", "Black"] as const;

type ProductListContextType = {
  selectedFilters: SelectedFiltersType;
  selectedSortStrategy: DefaultMapper;
  searchKeyword: string;
  setFilters: (filters: SelectedFiltersType) => void;
  setSortStrategy: (strategy: DefaultMapper) => void;
  setSearchKeyword: (keyword: string) => void;
} | null;

type SelectedFiltersType = {
  brand: string;
  color: string;
  priceRange: [number, number];
};

export const ProductListContext = createContext<ProductListContextType | null>(
  null,
);

export default function ProductListContextProvider({
  children,
}: PropsWithChildren) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    brand: "any",
    color: "any",
    priceRange: [0, 0],
  });
  const [selectedSortStrategy, setSelectedSortStrategy] =
    useState<DefaultMapper>("none");
  const [searchKeyword, setKeyword] = useState("");

  const setFilters = (filters: typeof selectedFilters) => {
    setSelectedFilters({ ...filters });
  };
  const setSortStrategy = (strategy: DefaultMapper) => {
    setSelectedSortStrategy(strategy);
  };
  const setSearchKeyword = (keyword: string) => setKeyword(keyword);

  return (
    <ProductListContext.Provider
      value={{
        selectedFilters,
        selectedSortStrategy,
        searchKeyword,
        setFilters,
        setSortStrategy,
        setSearchKeyword,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}

export function useProductListContext() {
  const value = useContext(ProductListContext);
  if (!value) {
    throw new Error(
      "component must be wrapped inside ProductListContextProvider",
    );
  }
  return value;
}
