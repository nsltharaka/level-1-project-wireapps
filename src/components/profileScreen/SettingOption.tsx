import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../ThemedText";

type Props = {
  title: string;
  value: boolean;
  onToggle: () => void;
};

export default function SettingOption({ title, value, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.titleText}>{title}</ThemedText>
      <Switch value={value} onChange={onToggle} />
      {/* <View style={styles.selectedOptionContainer}>
        <ThemedText style={styles.selectedOptionText}>
          {selectedOptionText}
        </ThemedText>
        <ThemedIcon name="chevron-forward-sharp" size={22} color={"grey"} />
      </View> */}
    </View>
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
