import type { defaultMappers } from "@/hooks/useSortedProducts";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import BottomSheet, { type Props } from "../../BottomSheet";

type SortBottomSheetProps = Props & {
  onMapperSelect: (mapperName: keyof typeof defaultMappers) => void;
};
export default function SortBottomSheet({
  isVisible,
  onCloseButtonPress,
  onMapperSelect,
}: SortBottomSheetProps) {
  return (
    <BottomSheet
      isVisible={isVisible}
      title="Sort by"
      height="30%"
      onCloseButtonPress={onCloseButtonPress}
    >
      <View style={styles.container}>
        <Button title="none" onPress={() => onMapperSelect("none")} />
        <Button
          title="price low to high"
          onPress={() => onMapperSelect("price low to high")}
        />
        <Button
          title="price high to low"
          onPress={() => onMapperSelect("price high to low")}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});
