import SelectableOption from "@/components/bottomSheets/filter/SelectableText";
import { IOS_DEFAULT_BACKGROUND_COLOR } from "@/constants/defaultStyles";
import {
  brands,
  colors,
  useProductListContext,
} from "@/contexts/productList/ProductListContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FilterBottomSheet() {
  const {
    selectedBrand,
    setSelectedBrand,
    selectedColor,
    setSelectedColor,
    selectedPriceRange,
    setSelectedPriceRange,
  } = useProductListContext();

  const onApply = () => {
    router.back();
  };
  const onClear = () => {};

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filters</Text>
          <Ionicons
            name="close-outline"
            color={"grey"}
            size={28}
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.filterContainer}>
            <View style={styles.optionRow}>
              <Text style={styles.optionTitle}>Brand :</Text>
              {brands.map((brandName, index) => (
                <SelectableOption
                  key={index}
                  selected={selectedBrand === brandName}
                  onPress={() => setSelectedBrand(brandName)}
                >
                  {brandName}
                </SelectableOption>
              ))}
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionTitle}>Color :</Text>
              {colors.map((colorName, index) => (
                <SelectableOption
                  key={index}
                  selected={selectedColor === colorName}
                  onPress={() => setSelectedColor(colorName)}
                >
                  {colorName}
                </SelectableOption>
              ))}
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionTitle}>Price :</Text>
              <View style={[styles.optionRow, { gap: 10 }]}>
                <Text>From</Text>
                <TextInput
                  keyboardType="number-pad"
                  defaultValue={selectedPriceRange[0].toString()}
                  selectTextOnFocus
                  onChangeText={(text) =>
                    setSelectedPriceRange((prev) => [
                      Number.parseFloat(text),
                      prev[1],
                    ])
                  }
                  style={styles.optionTextInput}
                />
                <Text>To</Text>
                <TextInput
                  keyboardType="number-pad"
                  defaultValue={selectedPriceRange[1].toString()}
                  selectTextOnFocus
                  onChangeText={(text) =>
                    setSelectedPriceRange((prev) => [
                      prev[0],
                      Number.parseFloat(text),
                    ])
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
              style={[styles.actionButton, { backgroundColor: "#fff" }]}
            >
              <Text style={[styles.actionButtonText, { color: "#000" }]}>
                Clear all filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000080",
  },
  modal: {
    height: "50%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  filterContainer: {
    gap: 20,
  },
  optionRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  optionTitle: {
    fontWeight: "bold",
  },
  optionTextInput: {
    backgroundColor: IOS_DEFAULT_BACKGROUND_COLOR,
    width: 70,
    padding: 7,
    borderRadius: 8,
  },
  buttonContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
