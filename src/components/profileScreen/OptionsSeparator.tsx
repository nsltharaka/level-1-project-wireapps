import { sizeConstants } from "@/theme/styleConstants";
import React from "react";
import { View } from "react-native";

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
        borderWidth: sizeConstants.widthHairLine,
        borderColor: color,
      }}
    />
  );
}
