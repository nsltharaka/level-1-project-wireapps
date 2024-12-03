import { render } from "@testing-library/react-native";
import ActionButton from "../ActionButton";

describe("<AddToCartButton />", () => {
  test("button renders correctly", () => {
    const { getByText } = render(
      <ActionButton title="test-button" onPress={() => {}} />,
    );

    getByText("test-button");
  });
});
