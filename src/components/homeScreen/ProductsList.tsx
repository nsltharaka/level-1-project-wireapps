import useShopContext from "@/hooks/useShopContext";
import { Product } from "@/types/product";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const { products } = useShopContext();
  const router = useRouter();

  const onPressItem = (itemId: string) => router.push(`/product/${itemId}`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
