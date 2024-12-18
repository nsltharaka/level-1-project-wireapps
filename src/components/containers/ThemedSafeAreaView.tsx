import { useThemeColor } from "@/hooks/useThemeColor";
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

export type ThemedViewProps = SafeAreaViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "baseBackground",
  );

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
