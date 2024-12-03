import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import type { Product } from "@/types/product";
import { router } from "expo-router";
import React, {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";
import { Image, StyleSheet, View } from "react-native";
import ThemedTouchableOpacity from "../containers/ThemedTouchableOpacity";
import { ThemedText } from "../ThemedText";

type Props = PropsWithChildren & {
  item: Product;
};

type ProductCardContext = {
  item: Product;
};

const ProductCardContext = createContext<ProductCardContext | undefined>(
  undefined,
);
function useProductCardContext() {
  const value = useContext(ProductCardContext);
  if (!value) {
    throw new Error(
      "component must be wrapped inside ProductCardContextProvider",
    );
  }
  return value;
}

export default function ProductCard({ item, children }: Props) {
  return (
    <ProductCardContext.Provider value={{ item }}>
      <ThemedTouchableOpacity
        lightColor={colorConstants.white}
        onPress={() => router.push(`/product/${item.id}`)}
        style={styles.container}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.mainImage }} style={styles.image} />
        </View>
        <View style={styles.descriptionContainer}>
          <ThemedText style={styles.itemName} numberOfLines={2}>
            {item.name}
          </ThemedText>
          {children}
        </View>
      </ThemedTouchableOpacity>
    </ProductCardContext.Provider>
  );
}

ProductCard.Color = () => {
  const { item } = useProductCardContext();
  return <ThemedText>{item.colour}</ThemedText>;
};
ProductCard.Price = () => {
  const { item } = useProductCardContext();
  return <ThemedText>$ {item.price}</ThemedText>;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colorConstants.backgroundLight,
    borderRadius: sizeConstants.borderRadiusDefault,
    flex: 1,
    // padding: sizeConstants.paddingSmall,
    shadowColor: colorConstants.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    gap: sizeConstants.flexGapSmall,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "grey",
  },
  imageContainer: {
    flex: 1,
    height: 200,
    padding: sizeConstants.paddingSmall,
    backgroundColor: colorConstants.white,
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
    borderTopRightRadius: sizeConstants.borderRadiusDefault,
  },
  image: {
    height: "100%",
    objectFit: "contain",
    width: sizeConstants.widthFullScreen,
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
    borderTopRightRadius: sizeConstants.borderRadiusDefault,
  },
  descriptionContainer: {
    padding: sizeConstants.paddingSmall,
    gap: sizeConstants.flexGapSmall,
  },
  itemName: {
    fontSize: fontConstants.sizeRegular,
    fontWeight: fontConstants.weightBold,
    height: 40,
    marginBottom: sizeConstants.marginSmall,
  },
  favoritesButton: {
    padding: sizeConstants.paddingSmall,
    position: "absolute",
    right: 5,
    top: 5,
  },
});
