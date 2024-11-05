import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { type Props } from "../BottomSheet";

type FilterBottomSheetProps = Props & {};

export default function FilterBottomSheet({
  isVisible,
  onCloseButtonPress,
}: FilterBottomSheetProps) {
  return (
    <BottomSheet isVisible={isVisible} onCloseButtonPress={onCloseButtonPress}>
      <View style={styles.container}>
        <Text>FilterBottomSheet</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgreen",
  },
});
