import { useProductContext } from "@/contexts/productList/ProductContext";
import { useProductListContext } from "@/contexts/productList/ProductListContext";
import type { Product } from "@/types/product";

export type Predicate = (item: Product) => boolean;

export default function useFilteredProducts() {
  const { products } = useProductContext();
  const { selectedBrand, selectedColor, selectedPriceRange, searchKeyword } =
    useProductListContext();

  const filters = [
    defaultFilters.withBrand(selectedBrand),
    defaultFilters.withColor(selectedColor),
    defaultFilters.withSearchKeyword(searchKeyword),
    defaultFilters.withPriceRange(selectedPriceRange),
  ];

  return {
    filteredProducts: products.filter(buildFilterFunction(...filters)),
  };
}

const buildFilterFunction = (...filters: Predicate[]) => {
  return (item: Product) => filters.every((predicate) => predicate(item));
};

export const defaultFilters = {
  withSearchKeyword: (key: string) => (item: Product) => {
    if (!key) return true;
    const searchableText = `${item.name.toLowerCase()} ${item.description.toLowerCase()} ${item.colour}`;
    return searchableText.includes(key.toLowerCase());
  },

  withBrand: (brandName: string) => (item: Product) => {
    if (brandName === "any") return true;
    const itemBrand = item.name.split(" ")[0];
    return itemBrand.toLowerCase() === brandName.toLowerCase();
  },

  withColor: (colorName: string) => (item: Product) => {
    if (colorName === "any") return true;
    return item.colour.toLowerCase() === colorName.toLowerCase();
  },

  withPriceRange: (priceRange: [number, number]) => (item: Product) => {
    if (priceRange[0] === 0 && priceRange[1] === 0) return true;
    const itemPrice = parseFloat(item.price);
    return itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
  },
};
