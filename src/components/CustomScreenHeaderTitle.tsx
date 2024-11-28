import ThemedView from "@/components/containers/ThemedView";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
  title: string;
  subTitle?: string;
};

export default function CustomScreenHeaderTitle({ title, subTitle }: Props) {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText style={styles.screenTitle}>{title}</ThemedText>
      <ThemedText style={styles.screenSubTitle}>{subTitle ?? ""}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: sizeConstants.paddingMedium,
    paddingVertical: sizeConstants.paddingVerticalScreenHeader,
    gap: 5,
  },
  screenTitle: {
    fontSize: fontConstants.sizeHeaderTitle,
    fontWeight: fontConstants.weightBold,
  },
  screenSubTitle: {
    fontSize: fontConstants.sizeHeaderSubTitle,
  },
});
