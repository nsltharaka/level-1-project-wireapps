import { useCartContext } from "@/contexts/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      <Ionicons
        name="cart-outline"
        size={28}
        color={"#000"}
        style={styles.icon}
      />
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
    backgroundColor: "red",
    borderRadius: 100,
    paddingHorizontal: 1,
    position: "absolute",
    right: 0,
    alignItems: "center",
    minWidth: 16,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
