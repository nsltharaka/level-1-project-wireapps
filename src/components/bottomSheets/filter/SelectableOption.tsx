import { colorConstants, fontConstants } from "@/theme/styleConstants";
import React from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

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
    <Text
      style={[styles.default, selected && styles.selectedText]}
      onPress={onPress}
    >
      {children}
    </Text>
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
