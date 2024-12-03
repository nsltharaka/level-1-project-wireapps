import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import ListOptionButton from "@/components/storeScreen/ListOptionButton";
import ProductCard from "@/components/storeScreen/ProductCard";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import useSortedProducts from "@/hooks/useSortedProducts";
import { sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { router, Stack } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, View, type ListRenderItem } from "react-native";

export default function StoreScreen() {
  const { setSearchKeywordWithDebounce } = useDebounceSearch();
  const { filteredProducts } = useFilteredProducts();
  const { products, activeMapper } = useSortedProducts(filteredProducts);

  const renderAsProducts: ListRenderItem<Product> = useMemo(
    () =>
      ({ item }) => {
        return (
          <View style={styles.productCardContainer} key={item.id}>
            <ProductCard item={item}>
              <ProductCard.Color />
              <ProductCard.Price />
            </ProductCard>
          </View>
        );
      },
    [],
  );

  return (
    <ThemedSafeAreaView style={styles.container} edges={["left", "right"]}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "search",
            onCancelButtonPress: () => setSearchKeywordWithDebounce(""), // for ios
            onClose: () => setSearchKeywordWithDebounce(""), // for android
            onChangeText: ({ nativeEvent: { text } }) =>
              setSearchKeywordWithDebounce(text),
          },
        }}
      />
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
        data={products}
        renderItem={renderAsProducts}
        keyExtractor={(product) => product.id}
        ListHeaderComponentStyle={styles.ListHeaderComponent}
        ListHeaderComponent={
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
        }
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizeConstants.paddingSmall,
  },
  ListHeaderComponent: {
    width: sizeConstants.widthFullScreen,
  },
  listOptionsContainer: {
    flexDirection: "row",
    gap: sizeConstants.flexGapMedium,
    marginBottom: sizeConstants.marginMedium,
  },
  contentContainer: {
    gap: sizeConstants.flexGapMedium,
    paddingBottom: sizeConstants.paddingMedium,
  },
  columnWrapper: {
    gap: sizeConstants.flexGapMedium,
  },
  productCardContainer: {
    width: "48.5%",
  },
});
