import CartItemCard from "@/components/cart/CartItemCard";
import { useCartContext } from "@/contexts/cartContext/CartContext";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Cart() {
  const [cart] = useCartContext();

  const FooterComponent = () => (
    <View style={styles.cartDescription}>
      <Text style={styles.totalAmount}>Total : $ {cart.totalAmount}</Text>
    </View>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <Text>Your cart is empty.</Text>
    </View>
  );

  return (
    <FlatList
      data={cart.cartItems}
      contentContainerStyle={styles.ContentContainer}
      renderItem={({ item }) => <CartItemCard item={item} />}
      ListFooterComponent={FooterComponent}
      ListEmptyComponent={EmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  ContentContainer: {
    gap: sizeConstants.flexGapMedium,
    padding: sizeConstants.paddingSmall,
  },
  cartDescription: {
    marginTop: sizeConstants.marginLarge,
    paddingHorizontal: sizeConstants.paddingLarge,
  },
  totalAmount: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeMedium,
    alignSelf: "flex-end",
  },
  emptyComponent: {
    height: "100%",
    justifyContent: "center",
  },
});
