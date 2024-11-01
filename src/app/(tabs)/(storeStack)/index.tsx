import ProductsList from "@/components/storeScreen/ProductsList";
import useFilteredProducts, {
  defaultFilters,
} from "@/hooks/useFilteredProducts";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreScreen() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { filteredProducts, addFilter, removeFilter, clearAllFilters } =
    useFilteredProducts(searchKeyword);

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
        <View>
          <Button
            title="add brand filter"
            onPress={() =>
              addFilter("withBrand", defaultFilters.withBrand("Nike"))
            }
          />
          <Button
            title="add color filter"
            onPress={() =>
              addFilter("withColor", defaultFilters.withColor("Black"))
            }
          />
          <Button
            title="remove brand filter"
            onPress={() => removeFilter("withBrand")}
          />
          <Button title="clear all filters" onPress={() => clearAllFilters()} />
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
  },
  listContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
