import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subTitle?: string;
};

export default function CustomScreenHeaderTitle({ title, subTitle }: Props) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.screenTitle}>{title}</Text>
      <Text style={styles.screenSubTitle}>{subTitle ?? ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: sizeConstants.paddingMedium,
    paddingVertical: sizeConstants.paddingVerticalScreenHeader,
    backgroundColor: colorConstants.backgroundDefaultIOS,
    gap: 5,
  },
  screenTitle: {
    fontSize: fontConstants.sizeScreenHeaderTitle,
    fontWeight: fontConstants.weightBold,
  },
  screenSubTitle: {
    color: colorConstants.textSub,
    fontSize: fontConstants.sizeScreenHeaderSubTitle,
  },
});
