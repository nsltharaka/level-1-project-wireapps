import { defaultStyles } from "@/constants/defaultStyles";
import { useCartContext } from "@/contexts/CartContext";
import type { CartItem } from "@/types/cartItem";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  const [_, dispatch] = useCartContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => router.navigate(`/product/${item.id}`)}
      >
        <Image source={{ uri: item.mainImage }} style={defaultStyles.image} />
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
        <Text numberOfLines={2} style={defaultStyles.itemName}>
          {item.name}
        </Text>
        <Text>color : {item.colour}</Text>
        <Text>$ {item.price}</Text>

        <View style={styles.quantityAdjuster}>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              dispatch({
                type: "adjustQuantity",
                data: { itemId: item.id, newQuantity: -1 },
              })
            }
          >
            <Ionicons name="remove" size={22} />
          </TouchableOpacity>
          <Text>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              dispatch({
                type: "adjustQuantity",
                data: { itemId: item.id, newQuantity: 1 },
              })
            }
          >
            <Ionicons name="add" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{ alignSelf: "flex-start" }}
        onPress={() => dispatch({ type: "removeItem", data: item.id })}
      >
        <Ionicons name="close-circle" size={28} color={"gray"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    height: 160,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderColor: "gray",
    padding: 10,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: 100,
    height: "100%",
  },
  descriptionContainer: {
    flex: 1,
    height: "100%",
    gap: 5,
  },
  quantityAdjuster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },
  adjustButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
    padding: 2,
  },
});
