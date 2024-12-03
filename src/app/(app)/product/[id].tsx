import ActionButton from "@/components/ActionButton";
import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useCartContext } from "@/contexts/cartContext/CartContext";
import { useFavoritesContext } from "@/contexts/favorites/FavoritesContext";
import { getProductById } from "@/services/productService";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const [_, dispatch] = useCartContext();
  const router = useRouter();

  const { isInFavorites, removeFromFavorites, addToFavorites } =
    useFavoritesContext();

  useEffect(() => {
    setSelectedProduct(getProductById(params.id));
  }, []);

  if (!selectedProduct) return null;

  const isItemFavorite = isInFavorites(selectedProduct.id);

  return (
    <ThemedSafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: selectedProduct?.mainImage }}
            style={styles.image}
          />
        }
      >
        <ThemedText style={styles.itemName}>{selectedProduct.name}</ThemedText>
        <ThemedText style={styles.itemPrice}>
          $ {selectedProduct.price}
        </ThemedText>
        <ThemedText style={styles.itemColor}>
          {selectedProduct.colour}
        </ThemedText>
        <ActionButton
          title={isItemFavorite ? "Remove from favorites" : "Add to favorites"}
          onPress={() =>
            isItemFavorite
              ? removeFromFavorites(selectedProduct.id)
              : addToFavorites(selectedProduct.id)
          }
          type="secondary"
          iconProps={{
            name: isItemFavorite ? "star" : "star-outline",
            size: 24,
          }}
        />
        <ThemedText style={styles.itemDescription}>
          {selectedProduct.description}
        </ThemedText>
      </ParallaxScrollView>
      <ActionButton
        title="Add to cart"
        iconProps={{ name: "cart", size: 24 }}
        style={styles.actionButton}
        textStyles={styles.actionButtonText}
        onPress={() => {
          dispatch({
            type: "addItem",
            data: { ...selectedProduct, quantity: 1 },
          });
          router.push("/(modals)/cart");
        }}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: sizeConstants.widthFullScreen,
    height: "100%",
    objectFit: "cover",
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
  actionButton: {
    paddingVertical: sizeConstants.paddingLarge,
    position: "absolute",
    bottom: 50,
    width: "90%",
    alignSelf: "center",
  },
  actionButtonText: {
    fontSize: fontConstants.sizeMedium,
  },
});
