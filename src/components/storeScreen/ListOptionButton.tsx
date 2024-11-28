import { sizeConstants } from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import ThemedTouchableOpacity from "../containers/ThemedTouchableOpacity";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

type Props = {
  onPress: () => void;
  icon: ComponentProps<typeof Ionicons>["name"];
  iconSize?: ComponentProps<typeof Ionicons>["size"];
  label: string;
};

export default function ListOptionButton({
  icon,
  iconSize,
  label,
  onPress,
}: Props) {
  return (
    <ThemedTouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedIcon name={icon} size={iconSize} />
      <ThemedText>{label}</ThemedText>
    </ThemedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: sizeConstants.flexGapMedium,
    // backgroundColor: "lightgreen",
    padding: sizeConstants.paddingMedium,
    paddingHorizontal: sizeConstants.paddingMedium,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
