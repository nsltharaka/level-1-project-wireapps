import useCartContext from "@/hooks/useCartContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Cart() {
  const [cart, dispatch] = useCartContext();

  return (
    <View style={styles.container}>
      {cart.cartItems.map((item) => (
        <Text key={item.id}>
          {item.name} : {item.quantity}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgreen",
  },
});
