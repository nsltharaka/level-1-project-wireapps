import ThemedView from "@/components/containers/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { useProductListContext } from "@/contexts/productList/ProductListContext";
import type { DefaultMapper } from "@/hooks/useSortedProducts";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

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
          <ThemedText style={styles.title}>Sort by</ThemedText>
          <ThemedIcon
            name="close-outline"
            size={28}
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.content}>
          <Button title="none" onPress={() => setStrategy("none")} />
          <Button
            title="price low to high"
            onPress={() => setStrategy("price low to high")}
          />
          <Button
            title="price high to low"
            onPress={() => setStrategy("price high to low")}
          />
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000080",
  },
  modal: {
    height: "30%",
    // backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 7,
  },
  sortOption: {
    color: "dodgerblue",
    fontSize: 18,
  },
});
