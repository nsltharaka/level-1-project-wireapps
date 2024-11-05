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
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 18,
    flexDirection: "row",
    gap: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
  buttonIcon: {
    position: "absolute",
    left: 30,
  },
});
