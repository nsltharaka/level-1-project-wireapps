import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { type Props } from "../../BottomSheet";

type FilterBottomSheetProps = Props & {};

export default function FilterBottomSheet({
  isVisible,
  title,
  onCloseButtonPress,
}: FilterBottomSheetProps) {
  return (
    <BottomSheet
      isVisible={isVisible}
      title={title}
      onCloseButtonPress={onCloseButtonPress}
    >
      <View style={styles.container}>
        <View>
          <Text>Brand:</Text>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
