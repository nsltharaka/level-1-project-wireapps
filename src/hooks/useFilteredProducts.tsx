import { useEffect, useState } from "react";

import data from "@/data/sample.json";

export default function useFilteredProducts(searchKeyword: string) {
  const [products, setProducts] = useState(() => data);

  useEffect(() => {
    // no value in the search bar
    if (!searchKeyword) {
      setProducts(data);
      return;
    }

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
