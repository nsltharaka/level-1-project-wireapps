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
    // maybe use a parallaxView from expo
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
      <Text style={styles.itemDescription}>{selectedProduct?.description}</Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  descriptionContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 22,
  },
  itemPrice: {},
  itemColor: {},
  itemDescription: {},
});
