import { render } from "@testing-library/react-native";
import AddToCartButton from "../AddToCartButton";

describe("<AddToCartButton />", () => {
  test("button renders correctly", () => {
    const { getByText } = render(<AddToCartButton onPress={() => {}} />);

    getByText("Add to cart");
  });
});
