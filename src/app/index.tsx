import ProductsList from "@/components/ProductsList";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Screen() {
  return (
    <View style={styles.container}>
      <ProductsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
