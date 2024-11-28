import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

type ProfileOptionButtonProps = {
  buttonName: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

export default function ProfileOptionButton({
  buttonName,
  icon,
}: ProfileOptionButtonProps) {
  return (
    <View style={styles.container}>
      <ThemedIcon name={icon} size={28} />
      <ThemedText style={styles.buttonName}>{buttonName}</ThemedText>
    </View>
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
