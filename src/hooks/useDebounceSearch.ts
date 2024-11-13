import { useProductListContext } from "@/contexts/productList/ProductListContext";
import { useEffect, useState } from "react";

export default function useDebounceSearch() {
  const { setSearchKeyword } = useProductListContext();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!keyword) {
      setSearchKeyword("");
      return;
    }

    const timeout = setTimeout(() => {
      setSearchKeyword(keyword);
    }, 500);
    return () => clearTimeout(timeout);
  }, [keyword]);

  return {
    setSearchKeywordWithDebounce: setKeyword,
  };
}
