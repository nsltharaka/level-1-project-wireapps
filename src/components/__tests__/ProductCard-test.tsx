import { render } from "@testing-library/react-native";
import ProductCard from "../storeScreen/ProductCard";

import FavoritesContextProvider from "@/contexts/favorites/FavoritesContext";
import sampleData from "@/data/sample.json";
import { type PropsWithChildren } from "react";

describe("<ProductCard />", () => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return <FavoritesContextProvider>{children}</FavoritesContextProvider>;
  };
  test("Product card renders correctly with all optional configs", () => {
    const tree = render(
      <ProductCard item={sampleData[0]}>
        <ProductCard.Color />
        <ProductCard.FavoriteButton />
        <ProductCard.Price />
      </ProductCard>,
      { wrapper: Wrapper },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
