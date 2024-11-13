import ListOptionButton from "@/components/storeScreen/ListOptionButton";
import ProductsList from "@/components/storeScreen/ProductsList";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import useSortedProducts from "@/hooks/useSortedProducts";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { filteredProducts } = useFilteredProducts(searchKeyword);
  const { products, activeMapper } = useSortedProducts(filteredProducts);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            headerIconColor: "#000",
            onCancelButtonPress: () => setSearchKeyword(""), // for ios
            onClose: () => setSearchKeyword(""), // for android
            onChangeText: ({ nativeEvent: { text } }) => setSearchKeyword(text),
          },
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.listOptionsContainer}>
          <ListOptionButton
            icon="filter"
            label="Filters"
            onPress={() => router.push("/(modals)/filterBottomSheet")}
          />
          <ListOptionButton
            icon="chevron-expand-outline"
            iconSize={16}
            label={`Sort by: ${activeMapper}`}
            onPress={() => router.push("/(modals)/sortBottomSheet")}
          />
        </View>

        <View style={styles.listContainer}>
          <ProductsList products={products} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listOptionsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
});
