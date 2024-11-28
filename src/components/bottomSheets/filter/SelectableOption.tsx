import { ThemedText } from "@/components/ThemedText";
import { colorConstants, fontConstants } from "@/theme/styleConstants";
import React from "react";
import { StyleSheet, type TextProps } from "react-native";

type Props = TextProps & {
  selected?: boolean;
  onPress: () => void;
};

export default function SelectableOption({
  selected,
  onPress,
  children,
}: Props) {
  return (
    <ThemedText
      style={[styles.default, selected && styles.selectedText]}
      onPress={onPress}
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  default: {
    padding: 7,
  },
  selectedText: {
    backgroundColor: colorConstants.black,
    color: colorConstants.white,
    fontWeight: fontConstants.weightBold,
  },
});
