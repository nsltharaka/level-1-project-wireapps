import useCartContext from "@/hooks/useCartContext";
import React from "react";
import { Text, View } from "react-native";

export default function Cart() {
  const [cart, dispatch] = useCartContext();

  return (
    <View>
      {cart.cartItems.map((item) => (
        <Text key={item.id}>
          {item.name} : {item.quantity}
        </Text>
      ))}
    </View>
  );
}
