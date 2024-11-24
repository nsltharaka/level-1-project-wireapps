import ProductCard from "@/components/storeScreen/ProductCard";
import { useFavoritesContext } from "@/contexts/favorites/FavoritesContext";
import { useProductContext } from "@/contexts/productList/ProductContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const [editMode, setEditMode] = useState(false);
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const { products } = useProductContext();

  const favoriteProducts = products.filter((p) => favorites.has(p.id));

  useFocusEffect(
    useCallback(() => {
      setEditMode(false);
    }, []),
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 10,
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
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
