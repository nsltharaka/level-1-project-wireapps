import { useCartContext } from "@/contexts/cartContext/CartContext";
import { colorConstants, fontConstants } from "@/theme/styleConstants";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "../ThemedIcon";

export default function CartIcon() {
  const [cart] = useCartContext();

  const cartItemsLength = cart.cartItems.length;
  const label =
    cartItemsLength === 0
      ? null
      : cartItemsLength > 10
        ? "10+"
        : cartItemsLength;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/(modals)/cart")}
    >
      <ThemedIcon name="cart-outline" size={28} style={styles.icon} />
      {label && (
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    aspectRatio: 1,
  },
  icon: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  labelWrapper: {
    backgroundColor: colorConstants.backgroundRed,
    borderRadius: 100,
    paddingHorizontal: 1,
    position: "absolute",
    right: 0,
    alignItems: "center",
    minWidth: 16,
  },
  label: {
    color: colorConstants.white,
    fontWeight: fontConstants.weightBold,
    fontSize: 12,
  },
});
