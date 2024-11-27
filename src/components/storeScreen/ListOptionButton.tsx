import { colorConstants, sizeConstants } from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={icon} color={"black"} size={iconSize} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: sizeConstants.flexGapMedium,
    backgroundColor: colorConstants.backgroundLight,
    padding: sizeConstants.paddingMedium,
    paddingHorizontal: sizeConstants.paddingMedium,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
