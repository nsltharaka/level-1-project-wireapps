import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedTouchableOpacity({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
