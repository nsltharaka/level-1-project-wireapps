import { Product } from "@/types/product";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductsList({ products }: Props) {
  const onPressItem = (itemId: string) => router.push(`/product/${itemId}`);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}
    >
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          item={product}
          onPressHandleFunc={onPressItem}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
