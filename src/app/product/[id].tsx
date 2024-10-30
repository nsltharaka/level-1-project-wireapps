import AddToCartButton from "@/components/AddToCartButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useCartContext from "@/hooks/useCartContext";
import useProductContext from "@/hooks/useShopContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  const { products } = useProductContext();
  const [_, dispatch] = useCartContext();
  const router = useRouter();

  const selectedProduct = products.find((item) => item.id === params.id);
  if (!selectedProduct) return null;

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
        <Text style={styles.itemName}>{selectedProduct.name}</Text>
        <Text style={styles.itemPrice}>$ {selectedProduct.price}</Text>
        <Text style={styles.itemColor}>{selectedProduct.colour}</Text>
        <Text style={styles.itemDescription}>
          {selectedProduct.description}
        </Text>
      </ParallaxScrollView>
      <AddToCartButton
        onPress={() => {
          dispatch({
            type: "addItem",
            data: { ...selectedProduct, quantity: 1 },
          });
          router.push("/(modals)/cart");
        }}
      />
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
