import { useState } from "react";

import data from "@/data/sample.json";

export default function useFilteredProducts() {
  const [products, setProducts] = useState(data);

  return {
    products,
  };
}
