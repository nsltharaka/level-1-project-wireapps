import { defaultStyles } from "@/constants/defaultStyles";
import type { CartItem } from "@/types/cartItem";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={{ uri: item.mainImage }} style={defaultStyles.image} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text numberOfLines={2} style={defaultStyles.itemName}>{item.name}</Text>
        <Text>color : {item.colour}</Text>
        <Text>$ {item.price}</Text>
      </View>

      <View style={styles.iconsContainer}>
        <Text>X</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    height: 150,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderColor: "gray",
    padding: 10,
    backgroundColor: "#fff"
  },
  imageContainer: {
    width: 100,
    height: "100%"
  },
  descriptionContainer: {
    flex: 1,
    height: "100%",
    gap: 5
  },
  iconsContainer: {
    backgroundColor: "lightgreen"
  }
});
