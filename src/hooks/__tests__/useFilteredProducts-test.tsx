import ProductContextProvider from "@/contexts/productList/ProductContext";
import { ProductListContext } from "@/contexts/productList/ProductListContext";
import sampleData from "@/data/sample.json";
import { renderHook } from "@testing-library/react-native";
import type { PropsWithChildren } from "react";
import useFilteredProducts, { defaultFilters } from "../useFilteredProducts";

it("should return every product", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductContextProvider>
        <ProductListContext.Provider
          value={{
            selectedBrand: "any",
            selectedColor: "any",
            selectedPriceRange: [0, 0],
            searchKeyword: "",
          }}
        >
          {children}
        </ProductListContext.Provider>
      </ProductContextProvider>
    );
  };

  const { result } = renderHook(() => useFilteredProducts(), {
    wrapper: Wrapper,
  });
  expect(result.current.filteredProducts).toEqual(sampleData);
});

it("should return every product of brand Nike", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductContextProvider>
        <ProductListContext.Provider
          value={{
            selectedBrand: "Nike",
            selectedColor: "any",
            selectedPriceRange: [0, 0],
            searchKeyword: "",
          }}
        >
          {children}
        </ProductListContext.Provider>
      </ProductContextProvider>
    );
  };

  const { result } = renderHook(() => useFilteredProducts(), {
    wrapper: Wrapper,
  });
  expect(result.current.filteredProducts).toEqual(
    sampleData.filter(defaultFilters.withBrand("Nike")),
  );
});

it("should return every product of brand Puma", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductContextProvider>
        <ProductListContext.Provider
          value={{
            selectedBrand: "Puma",
            selectedColor: "any",
            selectedPriceRange: [0, 0],
            searchKeyword: "",
          }}
        >
          {children}
        </ProductListContext.Provider>
      </ProductContextProvider>
    );
  };

  const { result } = renderHook(() => useFilteredProducts(), {
    wrapper: Wrapper,
  });
  expect(result.current.filteredProducts).toEqual(
    sampleData.filter(defaultFilters.withBrand("Puma")),
  );
});

it("should return every products with keyword 'blue' ", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductContextProvider>
        <ProductListContext.Provider
          value={{
            selectedBrand: "any",
            selectedColor: "any",
            selectedPriceRange: [0, 0],
            searchKeyword: "blue",
          }}
        >
          {children}
        </ProductListContext.Provider>
      </ProductContextProvider>
    );
  };

  const { result } = renderHook(() => useFilteredProducts(), {
    wrapper: Wrapper,
  });
  expect(result.current.filteredProducts).toEqual(
    sampleData.filter(defaultFilters.withSearchKeyword("blue")),
  );
});

it("should return every products between 0 and 100", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductContextProvider>
        <ProductListContext.Provider
          value={{
            selectedBrand: "any",
            selectedColor: "any",
            selectedPriceRange: [0, 100],
            searchKeyword: "",
          }}
        >
          {children}
        </ProductListContext.Provider>
      </ProductContextProvider>
    );
  };

  const { result } = renderHook(() => useFilteredProducts(), {
    wrapper: Wrapper,
  });
  expect(result.current.filteredProducts).toEqual(
    sampleData.filter(defaultFilters.withPriceRange([0, 100])),
  );
});
