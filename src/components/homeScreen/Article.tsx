import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ListRenderItem,
} from "react-native";

import type { Product } from "@/types/product";
import ProductCard from "../storeScreen/ProductCard";

const { width: screenWidth } = Dimensions.get("screen");

type ArticleProps = {
  imageSource: ImageSourcePropType;
  articleIntroText: string;
  title: string;
  listItems: Product[];
};

export default function Article({
  imageSource,
  articleIntroText,
  title,
  listItems,
}: ArticleProps) {
  const renderAsProducts: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.productCardContainer}>
      <ProductCard item={item}>
        <ProductCard.Price />
      </ProductCard>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.introText}>{articleIntroText}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={listItems}
        renderItem={renderAsProducts}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: 500,
    objectFit: "cover",
  },
  descriptionContainer: {
    padding: 20,
    gap: 16,
  },
  introText: {
    fontWeight: "semibold",
    fontSize: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#767676",
  },
  productCardContainer: {
    width: 200,
  },
  contentContainer: {
    gap: 10,
    padding: 20,
  },
});
