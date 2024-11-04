import ListOptionButton from "@/components/storeScreen/ListOptionButton";
import ProductsList from "@/components/storeScreen/ProductsList";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  const {
    filteredProducts,
    setSearchKeyword,
    addFilter,
    removeFilter,
    clearAllFilters,
  } = useFilteredProducts();

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
        <View style={{ flexDirection: "row", gap: 10 }}>
          <ListOptionButton icon="filter" label="Filters" onPress={() => {}} />
          <ListOptionButton
            icon="chevron-expand-outline"
            iconSize={16}
            label={`Sort by: ${"price low to high"}`}
            onPress={() => {}}
          />
        </View>

        <View style={styles.listContainer}>
          <ProductsList products={filteredProducts} />
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
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
});
