import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import ListOptionButton from "@/components/storeScreen/ListOptionButton";
import ProductCard from "@/components/storeScreen/ProductCard";
import { useProductListContext } from "@/contexts/productList/ProductListContext";
import useDebounceSearch from "@/hooks/useDebounceSearch";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import useSortedProducts from "@/hooks/useSortedProducts";
import { sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { router, Stack } from "expo-router";
import LottieView from "lottie-react-native";
import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, View, type ListRenderItem } from "react-native";

export default function StoreScreen() {
  const { setSearchKeywordWithDebounce } = useDebounceSearch();
  const { filteredProducts } = useFilteredProducts();
  const { products, activeMapper } = useSortedProducts(filteredProducts);
  const { selectedFilters } = useProductListContext();

  const renderAsProducts: ListRenderItem<Product> = ({ item }) => {
    return (
      <View style={styles.productCardContainer} key={item.id}>
        <ProductCard item={item}>
          <ProductCard.Color />
          <ProductCard.Price />
        </ProductCard>
      </View>
    );
  };

  const EmptyComponent = memo(() => {
    const animation = useRef<LottieView>(null);
    return (
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "transparent",
          }}
          source={require("@/assets/lottieAnimations/listEmptyAnimation.json")}
        />
      </View>
    );
  });

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
              activeIndicator={
                selectedFilters.brand !== "any" ||
                selectedFilters.color !== "any" ||
                selectedFilters.priceRange[0] !== 0 ||
                selectedFilters.priceRange[1] !== 0
              }
            />
            <ListOptionButton
              icon="chevron-expand-outline"
              iconSize={16}
              label={`Sort by: ${activeMapper}`}
              onPress={() => router.push("/(modals)/sortBottomSheet")}
            />
          </View>
        }
        ListEmptyComponent={EmptyComponent}
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
    paddingVertical: sizeConstants.paddingSmall,
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
