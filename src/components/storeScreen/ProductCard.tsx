import type { Product } from "@/types/product";
import { router } from "expo-router";
import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import FavoritesButton from "../FavoritesButton";

type Props = PropsWithChildren & {
  item: Product;
};

type ProductCardContext = {
  item: Product;
};

const ProductCardContext = createContext<ProductCardContext | undefined>(
  undefined,
);
function useProductCardContext() {
  const value = useContext(ProductCardContext);
  if (!value) {
    throw new Error(
      "component must be wrapped inside ProductCardContextProvider",
    );
  }
  return value;
}

export default function ProductCard({ item, children }: Props) {
  return (
    <ProductCardContext.Provider value={{ item }}>
      <TouchableOpacity
        onPress={() => router.push(`/product/${item.id}`)}
        style={styles.container}
      >
        <Image source={{ uri: item.mainImage }} style={styles.image} />
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        {children}
      </TouchableOpacity>
    </ProductCardContext.Provider>
  );
}

ProductCard.FavoriteButton = () => {
  const { item } = useProductCardContext();
  return <FavoritesButton style={styles.favoritesButton} forItem={item.id} />;
};
ProductCard.Color = () => {
  const { item } = useProductCardContext();
  return <Text>{item.colour}</Text>;
};
ProductCard.Price = () => {
  const { item } = useProductCardContext();
  return <Text>$ {item.price}</Text>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flex: 1,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    gap: 5,
  },
  image: {
    height: 200,
    objectFit: "contain",
    width: "100%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
    marginBottom: 5,
  },
  favoritesButton: {
    padding: 7,
    position: "absolute",
    right: 5,
    top: 5,
  },
});
