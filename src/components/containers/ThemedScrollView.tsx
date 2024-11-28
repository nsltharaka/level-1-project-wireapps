import { type ScrollViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ScrollView } from "react-native";

export type ThemedViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "baseBackground",
  );

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
