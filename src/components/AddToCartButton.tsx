import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
};

export default function AddToCartButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Ionicons
        name="cart"
        color={"#fff"}
        size={24}
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonText}>Add to cart</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorConstants.black,
    padding: sizeConstants.paddingLarge,
    borderRadius: sizeConstants.borderRadiusDefault,
  },
  buttonText: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeMedium,
    color: "#fff",
  },
  buttonIcon: {
    position: "absolute",
    left: 30,
  },
});
