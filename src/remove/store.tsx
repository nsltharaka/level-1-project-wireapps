import ProductsList from "@/components/storeScreen/ProductsList";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <ProductsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
