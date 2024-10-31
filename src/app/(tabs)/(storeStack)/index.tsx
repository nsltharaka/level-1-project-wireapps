import ProductsList from "@/components/storeScreen/ProductsList";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { filteredProducts } = useFilteredProducts(searchKeyword);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            headerIconColor: "#000",
            onCancelButtonPress: () => setSearchKeyword(""),
            onClose: () => setSearchKeyword(""),
            onChangeText: ({ nativeEvent: { text } }) => setSearchKeyword(text),
          },
        }}
      />
      <ProductsList products={filteredProducts} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
