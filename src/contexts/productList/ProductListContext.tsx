import type { DefaultMapper } from "@/hooks/useSortedProducts";
import React, {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export const brands = ["any", "Nike", "Puma"] as const;
export const colors = ["any", "Blue", "Black"] as const;

export const ProductListContext = createContext<{
  selectedBrand: (typeof brands)[number];
  setSelectedBrand: React.Dispatch<
    React.SetStateAction<(typeof brands)[number]>
  >;
  selectedColor: (typeof colors)[number];
  setSelectedColor: React.Dispatch<
    React.SetStateAction<(typeof colors)[number]>
  >;
  selectedPriceRange: [number, number];
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedSortStrategy: DefaultMapper;
  setSelectedSortStrategy: React.Dispatch<React.SetStateAction<DefaultMapper>>;
} | null>(null);

export default function ProductListContextProvider({
  children,
}: PropsWithChildren) {
  const [selectedBrand, setSelectedBrand] =
    useState<(typeof brands)[number]>("any");
  const [selectedColor, setSelectedColor] =
    useState<(typeof colors)[number]>("any");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0.0, 0.0]);
  const [selectedSortStrategy, setSelectedSortStrategy] =
    useState<DefaultMapper>("none");

  return (
    <ProductListContext.Provider
      value={{
        selectedBrand,
        setSelectedBrand,
        selectedColor,
        setSelectedColor,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedSortStrategy,
        setSelectedSortStrategy,
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
