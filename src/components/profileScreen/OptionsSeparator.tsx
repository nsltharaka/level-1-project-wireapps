import React from "react";
import { StyleSheet, View } from "react-native";

export default function OptionsSeparator({
  color,
  height,
}: {
  color: string;
  height: number;
}) {
  return (
    <View
      style={{
        height: height,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: color,
      }}
    />
  );
}
