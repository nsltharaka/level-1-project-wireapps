import ListOptionButton from "@/components/storeScreen/ListOptionButton";
import ProductCard from "@/components/storeScreen/ProductCard";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import useSortedProducts from "@/hooks/useSortedProducts";
import type { Product } from "@/types/product";
import { router, Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  const { setSearchKeywordWithDebounce } = useDebounceSearch();
  const { filteredProducts } = useFilteredProducts();
  const { products, activeMapper } = useSortedProducts(filteredProducts);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            headerIconColor: "#000",
            onCancelButtonPress: () => setSearchKeywordWithDebounce(""), // for ios
            onClose: () => setSearchKeywordWithDebounce(""), // for android
            onChangeText: ({ nativeEvent: { text } }) =>
              setSearchKeywordWithDebounce(text),
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
          {products.map((product: Product) => (
            <ProductCard key={product.id} item={product} />
          ))}
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
