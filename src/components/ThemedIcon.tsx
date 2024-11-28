import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ThemedIconProps = ComponentProps<typeof Ionicons> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({
  name,
  size,
  lightColor,
  darkColor,
  ...rest
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");

  return <Ionicons name={name} size={size} color={color} {...rest} />;
}
