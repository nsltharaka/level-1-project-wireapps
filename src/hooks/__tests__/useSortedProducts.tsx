import ProductListContextProvider, {
  ProductListContext,
} from "@/contexts/productList/ProductListContext";
import useSortedProducts from "@/hooks/useSortedProducts";
import type { Product } from "@/types/product";
import { renderHook } from "@testing-library/react-native";
import type { PropsWithChildren } from "react";

const products: Product[] = [
  {
    id: "1",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "10",
  },
  {
    id: "2",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "20",
  },
  {
    id: "3",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "30",
  },
];
const productsHighToLow: Product[] = [
  {
    id: "3",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "30",
  },
  {
    id: "2",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "20",
  },
  {
    id: "1",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "10",
  },
];
const productsLowToHigh: Product[] = [
  {
    id: "1",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "10",
  },
  {
    id: "2",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "20",
  },
  {
    id: "3",
    colour: "testColor",
    description: "testDescription",
    mainImage: "testURL",
    name: "testName",
    price: "30",
  },
];

it("sort with none option - should return the same order", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return <ProductListContextProvider>{children}</ProductListContextProvider>;
  };

  const { result } = renderHook(() => useSortedProducts(products), {
    wrapper: Wrapper,
  });
  expect(result.current.activeMapper).toBe("none");
  expect(result.current.products).toEqual(products);
});

it("sort with price low to high option", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductListContext.Provider
        value={{ selectedSortStrategy: "price low to high" }}
      >
        {children}
      </ProductListContext.Provider>
    );
  };

  const { result } = renderHook(() => useSortedProducts(products), {
    wrapper: Wrapper,
  });
  expect(result.current.activeMapper).toBe("price low to high");
  expect(result.current.products).toEqual(productsLowToHigh);
});
it("sort with high to low option", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ProductListContext.Provider
        value={{ selectedSortStrategy: "price high to low" }}
      >
        {children}
      </ProductListContext.Provider>
    );
  };

  const { result } = renderHook(() => useSortedProducts(products), {
    wrapper: Wrapper,
  });
  expect(result.current.activeMapper).toBe("price high to low");
  expect(result.current.products).toEqual(productsHighToLow);
});
