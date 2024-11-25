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

import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
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
    backgroundColor: colorConstants.backgroundDefault,
    paddingBottom: sizeConstants.paddingSmall,
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
    padding: sizeConstants.paddingMedium,
    gap: sizeConstants.flexGapDefault,
  },
  introText: {
    fontWeight: fontConstants.weightSemiBold,
    fontSize: fontConstants.sizeRegular,
  },
  title: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeScreenHeaderTitle,
    color: colorConstants.textSub,
  },
  productCardContainer: {
    width: 200,
  },
  contentContainer: {
    gap: sizeConstants.flexGapHorizontalLists,
    padding: sizeConstants.paddingMedium,
  },
});
