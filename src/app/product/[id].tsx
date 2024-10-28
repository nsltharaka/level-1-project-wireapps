import AddToCartButton from "@/components/AddToCartButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useShopContext from "@/hooks/useShopContext";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  const { products } = useShopContext();
  const selectedProduct = products.find((item) => item.id === params.id);

  return (
    <>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: selectedProduct?.mainImage }}
            style={styles.image}
          />
        }
      >
        <Text style={styles.itemName}>{selectedProduct?.name}</Text>
        <Text style={styles.itemPrice}>$ {selectedProduct?.price}</Text>
        <Text style={styles.itemColor}>{selectedProduct?.colour}</Text>
        <Text style={styles.itemDescription}>
          {selectedProduct?.description}
        </Text>
      </ParallaxScrollView>
      <AddToCartButton />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  itemPrice: {},
  itemColor: {},
  itemDescription: {},
});
