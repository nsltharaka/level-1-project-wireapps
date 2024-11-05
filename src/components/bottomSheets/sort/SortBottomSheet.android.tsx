import type { defaultMappers } from "@/hooks/useSortedProducts";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
        <Text style={styles.sortOption} onPress={() => onMapperSelect("none")}>
          None
        </Text>
        <Text
          style={styles.sortOption}
          onPress={() => onMapperSelect("price low to high")}
        >
          price low to high
        </Text>
        <Text
          style={styles.sortOption}
          onPress={() => onMapperSelect("price high to low")}
        >
          price high to low
        </Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  sortOption: {
    color: "dodgerblue",
    fontSize: 18,
  },
});
