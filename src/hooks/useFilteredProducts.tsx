import { useProductContext } from "@/contexts/ProductContext";
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
      products.filter((i) =>
        i.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      ),
    );
  }, [searchKeyword]);

  return {
    filteredProducts,
  };
}
