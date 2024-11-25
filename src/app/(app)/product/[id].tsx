import AddToCartButton from "@/components/AddToCartButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useCartContext } from "@/contexts/cartContext/CartContext";
import { getProductById } from "@/services/productService";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const [_, dispatch] = useCartContext();
  const router = useRouter();

  useEffect(() => {
    setSelectedProduct(getProductById(params.id));
  }, []);

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
    width: sizeConstants.widthFullScreen,
    height: "100%",
    objectFit: "contain",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  itemName: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeLarge,
  },
  itemPrice: {},
  itemColor: {},
  itemDescription: {},
});
