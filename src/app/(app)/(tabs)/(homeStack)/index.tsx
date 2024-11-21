import Article from "@/components/homeScreen/Article";
import { IOS_DEFAULT_BACKGROUND_COLOR } from "@/constants/defaultStyles";
import { useProductContext } from "@/contexts/productList/ProductContext";
import { defaultFilters } from "@/hooks/useFilteredProducts";
import { formatDate } from "@/utils/dates";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { products } = useProductContext();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle}>Discover</Text>
          <Text style={styles.screenSubTitle}>{formatDate(new Date())}</Text>
        </View>
        <Article
          imageSource={require("@/assets/images/Nike.png")}
          articleIntroText="What's new"
          title="The latest arrivals from Nike"
          listItems={products
            .filter(defaultFilters.withBrand("Nike"))
            .slice(0, 3)}
        />
        <Article
          imageSource={require("@/assets/images/puma.png")}
          articleIntroText="What's new"
          title="The latest arrivals from Puma"
          listItems={products
            .filter(defaultFilters.withBrand("Puma"))
            .slice(0, 3)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: IOS_DEFAULT_BACKGROUND_COLOR,
    gap: 5,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  screenSubTitle: {
    color: "#767676",
    fontSize: 18,
  },
});
