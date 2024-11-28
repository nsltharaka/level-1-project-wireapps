import ThemedView from "@/components/containers/ThemedView";
import { useProductListContext } from "@/contexts/productList/ProductListContext";
import type { DefaultMapper } from "@/hooks/useSortedProducts";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FilterBottomSheet() {
  const { setSortStrategy } = useProductListContext();

  const setStrategy = (strategy: DefaultMapper) => {
    setSortStrategy(strategy);
    router.back();
  };

  return (
    <View style={styles.modalContainer}>
      <ThemedView style={styles.modal}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sort by</Text>
          <Ionicons
            name="close-outline"
            color={"grey"}
            size={28}
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.sortOption} onPress={() => setStrategy("none")}>
            None
          </Text>
          <Text
            style={styles.sortOption}
            onPress={() => setStrategy("price low to high")}
          >
            price low to high
          </Text>
          <Text
            style={styles.sortOption}
            onPress={() => setStrategy("price high to low")}
          >
            price high to low
          </Text>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colorConstants.backgroundDimmed,
  },
  modal: {
    height: "30%",
    // backgroundColor: colorConstants.backgroundLight,
    borderTopRightRadius: sizeConstants.borderRadiusDefault,
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sizeConstants.paddingSmall,
    paddingLeft: sizeConstants.paddingLarge,
    paddingRight: sizeConstants.paddingSmall,
    borderBottomWidth: sizeConstants.widthHairLine,
    borderBottomColor: "grey",
  },
  title: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeRegular,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: sizeConstants.paddingLarge,
    gap: sizeConstants.flexGapLarge,
  },
  sortOption: {
    color: "dodgerblue",
    fontSize: 18,
  },
});
