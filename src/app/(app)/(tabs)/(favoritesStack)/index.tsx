import ThemedScrollView from "@/components/containers/ThemedScrollView";
import ProductCard from "@/components/storeScreen/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { useFavoritesContext } from "@/contexts/favorites/FavoritesContext";
import { useProductContext } from "@/contexts/productList/ProductContext";
import { sizeConstants } from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect } from "expo-router";
import LottieView from "lottie-react-native";
import React, { memo, useCallback, useRef, useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";

export default function FavoritesScreen() {
  const [editMode, setEditMode] = useState(false);
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const { products } = useProductContext();

  const favoriteProducts = products.filter((p) => favorites.has(p.id));

  const EmptyComponent = memo(() => {
    const animation = useRef<LottieView>(null);

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 100,
            aspectRatio: 1,
            backgroundColor: "transparent",
          }}
          source={require("@/assets/lottieAnimations/favoritesAnimation.json")}
        />
        <ThemedText>Your favorite items will be listed here.</ThemedText>
      </View>
    );
  });

  //TODO : double check whether we can use usecallback like this
  useFocusEffect(
    useCallback(() => {
      setEditMode(false);
    }, [])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={() => setEditMode((prev) => !prev)}
              title={editMode ? "Done" : "Edit"}
            />
          ),
        }}
      />
      <ThemedScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        {favoriteProducts.length ? (
          <View style={styles.listContainer}>
            {favoriteProducts.map((product) => (
              <View key={product.id} style={styles.productCardContainer}>
                <ProductCard item={product} />
                {editMode && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => removeFromFavorites(product.id)}
                  >
                    <Ionicons name="remove" color={"grey"} size={24} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          <EmptyComponent />
        )}
      </ThemedScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: sizeConstants.flexGapMedium,
    padding: sizeConstants.paddingSmall,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: sizeConstants.widthHairLine,
    justifyContent: "center",
    padding: 3,
    position: "absolute",
    right: -7,
    top: -7,
  },
  productCardContainer: {
    width: "48%",
  },
});
