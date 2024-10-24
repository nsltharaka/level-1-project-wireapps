import useShopContext from "@/hooks/useShopContext";
import React from "react";
import { Text, View } from "react-native";

export default function ProductsList() {
  const { products } = useShopContext();

  return (
    <View>
      <Text>{products.length}</Text>
    </View>
  );
}
