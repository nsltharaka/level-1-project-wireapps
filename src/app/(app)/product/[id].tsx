import ActionButton from "@/components/ActionButton";
import ParallaxScrollView from "@/components/containers/ParallaxScrollView";
import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useCartContext } from "@/contexts/cartContext/CartContext";
import { useFavoritesContext } from "@/contexts/favorites/FavoritesContext";
import { useProductContext } from "@/contexts/productList/ProductContext";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { products } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const { addItem } = useCartContext();
  const router = useRouter();

  const { isInFavorites, removeFromFavorites, addToFavorites } =
    useFavoritesContext();

  useFocusEffect(
    useCallback(() => {
      setSelectedProduct(products.find((product) => product.id === params.id));
    }, [products]),
  );

  if (!selectedProduct) return null;

  const isItemFavorite = isInFavorites(selectedProduct.id);
  const outOfStockItem = selectedProduct.quantity === 0;

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
        {outOfStockItem ? (
          <Text style={{ color: "red" }}>Out of stock</Text>
        ) : (
          <Text style={{ color: "green" }}>
            {selectedProduct.quantity} in stock
          </Text>
        )}
        <ThemedText style={styles.itemPrice}>
          $ {selectedProduct.price}
        </ThemedText>
        <ThemedText style={styles.itemColor}>
          {selectedProduct.colour}
        </ThemedText>
        <ActionButton
          style={styles.favoritesButton}
          title={isItemFavorite ? "Remove from favorites" : "Add to favorites"}
          onPress={() =>
            isItemFavorite
              ? removeFromFavorites(selectedProduct.id)
              : addToFavorites(selectedProduct.id)
          }
          type="secondary"
          iconProps={{
            name: isItemFavorite ? "star" : "star-outline",
            size: 20,
          }}
        />
        <ThemedText style={styles.itemDescription}>
          {selectedProduct.description}
        </ThemedText>
      </ParallaxScrollView>
      {!outOfStockItem && (
        <ActionButton
          title="Add to cart"
          iconProps={{ name: "cart", size: 30 }}
          style={styles.actionButton}
          textStyles={styles.actionButtonText}
          onPress={() => {
            addItem(selectedProduct.id);
            router.push("/(modals)/cart");
          }}
        />
      )}
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
  favoritesButton: {
    paddingVertical: sizeConstants.paddingSmall,
  },
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
