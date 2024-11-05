import type { Product } from "@/types/product";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Product;
  onPressHandleFunc: (itemId: string) => void;
};

export default function ProductCard({ item, onPressHandleFunc }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPressHandleFunc(item.id)}
      style={styles.container}
    >
      <Image source={{ uri: item.mainImage }} style={styles.image} />
      <Text style={styles.itemName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text>{item.colour}</Text>
      <Text>$ {item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
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
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
    marginBottom: 5,
  },
});
