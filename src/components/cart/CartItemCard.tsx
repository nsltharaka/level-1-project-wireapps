import { useCartContext } from "@/contexts/cartContext/CartContext";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import type { CartItem } from "@/types/cartItem";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  const [_, dispatch] = useCartContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
        <Text numberOfLines={2} style={styles.itemName}>
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
    gap: sizeConstants.flexGapDefault,
    alignItems: "center",
    height: 160,
    borderWidth: sizeConstants.widthHairLine,
    borderRadius: sizeConstants.borderRadiusDefault,
    borderColor: colorConstants.backgroundDimmed,
    padding: sizeConstants.paddingSmall,
    backgroundColor: colorConstants.white,
  },
  imageContainer: {
    width: 100,
    height: "100%",
  },
  image: {
    width: sizeConstants.widthFullScreen,
    height: "100%",
    objectFit: "contain",
  },
  itemName: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeRegular,
  },
  descriptionContainer: {
    flex: 1,
    height: "100%",
    gap: sizeConstants.flexGapMedium,
  },
  quantityAdjuster: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizeConstants.flexGapLarge,
    marginTop: sizeConstants.marginSmall,
  },
  adjustButton: {
    borderWidth: sizeConstants.widthHairLine,
    borderRadius: 100,
    padding: 2,
  },
});
