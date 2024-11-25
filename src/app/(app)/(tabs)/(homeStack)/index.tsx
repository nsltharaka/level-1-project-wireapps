import CustomScreenHeaderTitle from "@/components/CustomScreenHeaderTitle";
import Article from "@/components/homeScreen/Article";
import { useProductContext } from "@/contexts/productList/ProductContext";
import { defaultFilters } from "@/hooks/useFilteredProducts";
import { formatDate } from "@/utils/dates";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function HomeScreen() {
  const { products } = useProductContext();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <CustomScreenHeaderTitle
          title="Discover"
          subTitle={formatDate(new Date())}
        />
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
