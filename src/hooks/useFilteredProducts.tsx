import { useEffect, useState } from "react";

import data from "@/data/sample.json";

export default function useFilteredProducts(searchKeyword: string) {
  const [products, setProducts] = useState(() => data);

  useEffect(() => {
    if (!searchKeyword) return;

    setProducts(
      products.filter((i) =>
        i.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      ),
    );
  }, [searchKeyword]);

  return {
    products,
  };
}
