import { useCartContext } from "@/contexts/cartContext/CartContext";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import type { CartItem } from "@/types/cartItem";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedTouchableOpacity from "../containers/ThemedTouchableOpacity";
import ThemedView from "../containers/ThemedView";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

type Props = {
  item: CartItem;
};

export default function CartItemCard({ item }: Props) {
  const [_, dispatch] = useCartContext();

  return (
    <ThemedView lightColor={colorConstants.white} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.mainImage }} style={styles.image} />
      </View>

      <View style={styles.descriptionContainer}>
        <ThemedText numberOfLines={2} style={styles.itemName}>
          {item.name}
        </ThemedText>
        <ThemedText>color : {item.colour}</ThemedText>
        <ThemedText>$ {item.price}</ThemedText>

        <View style={styles.quantityAdjuster}>
          <ThemedTouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              dispatch({
                type: "adjustQuantity",
                data: { itemId: item.id, newQuantity: -1 },
              })
            }
          >
            <ThemedIcon name="remove" size={22} />
          </ThemedTouchableOpacity>
          <ThemedText>{item.quantity}</ThemedText>
          <ThemedTouchableOpacity
            style={styles.adjustButton}
            onPress={() =>
              dispatch({
                type: "adjustQuantity",
                data: { itemId: item.id, newQuantity: 1 },
              })
            }
          >
            <ThemedIcon name="add" size={22} />
          </ThemedTouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{ alignSelf: "flex-start" }}
        onPress={() => dispatch({ type: "removeItem", data: item.id })}
      >
        <View style={styles.actionButtonContainer}>
          <Ionicons name="close-circle" size={28} color={"gray"} />
        </View>
      </TouchableOpacity>
    </ThemedView>
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
  },
  imageContainer: {
    width: 120,
    height: "100%",
    padding: sizeConstants.paddingSmall,
    backgroundColor: colorConstants.white,
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
    borderBottomLeftRadius: sizeConstants.borderRadiusDefault,
  },
  image: {
    width: sizeConstants.widthFullScreen,
    height: "100%",
    objectFit: "contain",
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
    borderBottomLeftRadius: sizeConstants.borderRadiusDefault,
  },
  itemName: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeRegular,
  },
  descriptionContainer: {
    flex: 1,
    height: "100%",
    gap: sizeConstants.flexGapMedium,
    padding: sizeConstants.paddingSmall,
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
  actionButtonContainer: {
    padding: sizeConstants.paddingSmall,
  },
});
