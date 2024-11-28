import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ListRenderItem,
} from "react-native";

import ThemedView from "@/components/containers/ThemedView";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import ProductCard from "../storeScreen/ProductCard";
import { ThemedText } from "../ThemedText";

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
    <ThemedView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <ThemedText style={styles.introText}>{articleIntroText}</ThemedText>
        <ThemedText style={styles.title}>{title}</ThemedText>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={listItems}
        renderItem={renderAsProducts}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: sizeConstants.paddingMedium,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: sizeConstants.widthFullScreen,
    height: 500,
    objectFit: "cover",
  },
  descriptionContainer: {
    padding: sizeConstants.paddingLarge,
    gap: sizeConstants.flexGapDefault,
  },
  introText: {
    fontWeight: fontConstants.weightSemiBold,
    fontSize: fontConstants.sizeRegular,
  },
  title: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeHeaderTitle,
  },
  productCardContainer: {
    width: 200,
  },
  contentContainer: {
    gap: sizeConstants.flexGapMedium,
    padding: sizeConstants.paddingLarge,
  },
});
