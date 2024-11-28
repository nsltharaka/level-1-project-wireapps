import { useThemeColor } from "@/hooks/useThemeColor";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import ThemedView from "../containers/ThemedView";
import { ThemedText } from "../ThemedText";

type ProfileOptionButtonProps = {
  buttonName: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

export default function ProfileOptionButton({
  buttonName,
  icon,
}: ProfileOptionButtonProps) {
  const iconColor = useThemeColor({ dark: "#fff", light: "#000" }, "tint");
  return (
    <ThemedView style={styles.container}>
      <Ionicons name={icon} size={28} color={iconColor} />
      <ThemedText style={styles.buttonName}>{buttonName}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: sizeConstants.flexGapSmall,
  },
  buttonName: {
    fontSize: fontConstants.sizeDefault,
  },
});
