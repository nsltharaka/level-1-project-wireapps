import { useProductContext } from "@/contexts/ProductContext";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function useFilteredProducts(searchKeyword: string) {
  const { products } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState(() => products);

  useEffect(() => {
    // no value in the search bar
    if (!searchKeyword) {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter(buildFilterFunc(withSearchKeyword(searchKeyword))),
    );
  }, [searchKeyword]);

  return {
    filteredProducts,
  };
}

// const mainFilter =  buildFilterFunc(price(highToLow), color("blue"), brand("Nike"))
// typeof mainFilter is : (item) => boolean
// products.filter(mainFilter)

type Predicate = (item: Product) => boolean;

const buildFilterFunc = (...filters: Predicate[]) => {
  return filters.reduce(
    (combined, predicate) => (item) => combined(item) && predicate(item),
    () => true,
  );
};

const withSearchKeyword = (key: string) => (item: Product) => {
  const stringified = item.name
    .toLowerCase()
    .concat(" ")
    .concat(item.description.toLowerCase())
    .concat(" ")
    .concat(item.colour);
  return stringified.includes(key.toLowerCase());
};

const withBrand = (brandName: string) => (item: Product) => {
  const itemBrand = item.name.substring(0, item.name.indexOf(" "));
  return itemBrand.toLowerCase() === brandName.toLowerCase();
};

const withColor = (colorName: string) => {
  return (item: Product) => item.colour === colorName;
};
