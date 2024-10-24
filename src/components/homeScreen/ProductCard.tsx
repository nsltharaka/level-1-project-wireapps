import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { Product } from "@/types/product";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <Text>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    height: 250,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "contain",
  },
});
