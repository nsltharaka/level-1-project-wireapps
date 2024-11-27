import { useProductListContext } from "@/contexts/productList/ProductListContext";
import type { DefaultMapper } from "@/hooks/useSortedProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function FilterBottomSheet() {
  const { setSortStrategy } = useProductListContext();

  const setStrategy = (strategy: DefaultMapper) => {
    setSortStrategy(strategy);
    router.back();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
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
      </View>
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
    backgroundColor: "white",
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
