import SelectableOption from "@/components/bottomSheets/filter/SelectableOption";
import ThemedView from "@/components/containers/ThemedView";
import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import {
  brands,
  colors,
  useProductListContext,
} from "@/contexts/productList/ProductListContext";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FilterBottomSheet() {
  const { selectedFilters, setFilters } = useProductListContext();

  const [brand, setBrand] = useState<(typeof selectedFilters)["brand"]>(
    selectedFilters.brand,
  );
  const [color, setColor] = useState<(typeof selectedFilters)["color"]>(
    selectedFilters.color,
  );
  const [priceRange, setPriceRange] = useState<
    (typeof selectedFilters)["priceRange"]
  >(selectedFilters.priceRange);

  const onApply = () => {
    setFilters({
      brand,
      color,
      priceRange,
    });
    router.back();
  };
  const onClear = () => {
    setFilters({
      brand: "any",
      color: "any",
      priceRange: [0, 0],
    });
    router.back();
  };

  return (
    <View style={styles.modalContainer}>
      <ThemedView style={styles.modal}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Filters</ThemedText>
          <ThemedIcon
            name="close-outline"
            size={28}
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.filterContainer}>
            <View style={styles.optionRow}>
              <ThemedText style={styles.optionTitle}>Brand :</ThemedText>
              {brands.map((brandName, index) => (
                <SelectableOption
                  key={index}
                  selected={brand === brandName}
                  onPress={() => setBrand(brandName)}
                >
                  {brandName}
                </SelectableOption>
              ))}
            </View>
            <View style={styles.optionRow}>
              <ThemedText style={styles.optionTitle}>Color :</ThemedText>
              {colors.map((colorName, index) => (
                <SelectableOption
                  key={index}
                  selected={color === colorName}
                  onPress={() => setColor(colorName)}
                >
                  {colorName}
                </SelectableOption>
              ))}
            </View>
            <View style={styles.optionRow}>
              <ThemedText style={styles.optionTitle}>Price :</ThemedText>
              <View style={[styles.optionRow, { gap: 10 }]}>
                <ThemedText>From</ThemedText>
                <TextInput
                  keyboardType="number-pad"
                  defaultValue={selectedFilters.priceRange[0].toString()}
                  selectTextOnFocus
                  onChangeText={(text) =>
                    setPriceRange((prev) => [Number.parseFloat(text), prev[1]])
                  }
                  style={styles.optionTextInput}
                />
                <ThemedText>To</ThemedText>
                <TextInput
                  keyboardType="number-pad"
                  defaultValue={selectedFilters.priceRange[1].toString()}
                  selectTextOnFocus
                  onChangeText={(text) =>
                    setPriceRange((prev) => [prev[0], Number.parseFloat(text)])
                  }
                  style={styles.optionTextInput}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={onApply}>
              <Text style={styles.actionButtonText}>Apply filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClear}
              style={[
                styles.actionButton,
                { backgroundColor: colorConstants.white },
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  { color: colorConstants.black },
                ]}
              >
                Clear all filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colorConstants.backgroundDimmed,
  },
  modal: {
    height: "50%",
    // backgroundColor: colorConstants.backgroundLight,
    borderTopRightRadius: sizeConstants.borderRadiusDefault,
    borderTopLeftRadius: sizeConstants.borderRadiusDefault,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: sizeConstants.paddingSmall,
    paddingLeft: sizeConstants.paddingLarge,
    paddingRight: sizeConstants.paddingSmall,
    borderBottomWidth: sizeConstants.widthHairLine,
    borderBottomColor: "grey",
  },
  title: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeRegular,
  },
  content: {
    padding: sizeConstants.paddingLarge,
    paddingBottom: sizeConstants.paddingLarge * 2,
    flex: 1,
    justifyContent: "space-between",
  },
  filterContainer: {
    gap: sizeConstants.flexGapLarge,
  },
  optionRow: {
    flexDirection: "row",
    gap: sizeConstants.flexGapLarge,
    alignItems: "center",
  },
  optionTitle: {
    fontWeight: fontConstants.weightBold,
  },
  optionTextInput: {
    backgroundColor: colorConstants.backgroundDefaultIOS,
    width: 70,
    padding: 7,
    borderRadius: 8,
  },
  buttonContainer: {
    gap: sizeConstants.flexGapMedium,
  },
  actionButton: {
    backgroundColor: colorConstants.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: sizeConstants.paddingMedium,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionButtonText: {
    color: colorConstants.white,
    fontWeight: fontConstants.weightBold,
  },
});
