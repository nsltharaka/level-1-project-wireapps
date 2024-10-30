import CartItemCard from "@/components/cart/CartItemCard";
import useCartContext from "@/hooks/useCartContext";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Cart() {
  const [cart, dispatch] = useCartContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.cartItems}
        contentContainerStyle={styles.ContentContainer}
        renderItem={({ item }) => <CartItemCard item={item} />}
      />
      <View style={styles.cartDescription}>
        <Text style={styles.totalAmount}>Total : $ {cart.totalAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  ContentContainer: {
    gap: 10,
  },
  cartDescription: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-end"
  }
});
