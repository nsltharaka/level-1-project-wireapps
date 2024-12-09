import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

type Props = {
  title: string;
  onPress: () => void;
};

export default function SettingOption({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText style={styles.titleText}>{title}</ThemedText>
      <View style={styles.selectedOptionContainer}>
        <ThemedText style={styles.selectedOptionText}>
          Same as system
        </ThemedText>
        <ThemedIcon name="chevron-forward-sharp" size={22} color={"grey"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: sizeConstants.paddingMedium,
    paddingHorizontal: sizeConstants.paddingLarge,
    borderWidth: sizeConstants.widthHairLine,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: fontConstants.sizeRegular,
  },
  selectedOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizeConstants.flexGapSmall,
  },
  selectedOptionText: {
    fontSize: fontConstants.sizeRegular,
    color: "grey",
  },
});
