import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { type Props } from "../BottomSheet";

type SortBottomSheetProps = Props & {};
export default function SortBottomSheet({
  isVisible,
  onCloseButtonPress,
}: SortBottomSheetProps) {
  return (
    <BottomSheet isVisible={isVisible} onCloseButtonPress={onCloseButtonPress}>
      <View>
        <Text>SortBottomSheet</Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({});
