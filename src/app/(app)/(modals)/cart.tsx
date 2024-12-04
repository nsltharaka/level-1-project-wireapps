import ActionButton from "@/components/ActionButton";
import CartItemCard from "@/components/cart/CartItemCard";
import ThemedView from "@/components/containers/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useCartContext } from "@/contexts/cartContext/CartContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Cart() {
  const [cart] = useCartContext();

  const backgroundColor = useThemeColor({}, "baseBackground");

  const FooterComponent = useCallback(
    () => (
      <View style={styles.cartDescription}>
        <ThemedText style={styles.totalAmount}>
          Total : $ {cart.totalAmount}
        </ThemedText>
      </View>
    ),
    [cart],
  );

  const EmptyComponent = memo(() => (
    <View style={styles.emptyComponent}>
      <ThemedText>Your cart is empty.</ThemedText>
    </View>
  ));

  return (
    <ThemedView style={[{ backgroundColor }, styles.flatListContainer]}>
      <FlatList
        data={cart.cartItems}
        contentContainerStyle={styles.ContentContainer}
        renderItem={({ item }) => <CartItemCard item={item} />}
        ListFooterComponent={FooterComponent}
        ListEmptyComponent={EmptyComponent}
      />
      <ActionButton
        title="Checkout"
        textStyles={styles.actionButtonText}
        onPress={() => {}}
        style={styles.actionButton}
        iconProps={{
          name: "bag-check",
          size: 30,
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: { flex: 1 },
  ContentContainer: {
    gap: sizeConstants.flexGapMedium,
    padding: sizeConstants.paddingSmall,
  },
  cartDescription: {
    marginTop: sizeConstants.marginLarge,
    paddingHorizontal: sizeConstants.paddingLarge,
    marginBottom: 200,
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
  actionButton: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    bottom: 50,
    paddingVertical: sizeConstants.paddingLarge,
  },
  actionButtonText: {
    fontSize: fontConstants.sizeMedium,
  },
});
