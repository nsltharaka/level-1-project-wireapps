import { useFavoritesContext } from "@/contexts/favorites/FavoritesContext";
import type { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, type ViewProps } from "react-native";

type Props = ViewProps & {
  forItem: Product["id"];
};

export default function FavoritesButton({ forItem: itemId, style }: Props) {
  const { isInFavorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();
  const itemIsInFavorites = isInFavorites(itemId);

  return (
    <TouchableOpacity
      onPress={() =>
        itemIsInFavorites ? removeFromFavorites(itemId) : addToFavorites(itemId)
      }
      style={[styles.container, style]}
    >
      <Ionicons
        name={itemIsInFavorites ? "star" : "star-outline"}
        color={"grey"}
        size={20}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
