import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddToCartButton() {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => console.warn("add item to the cart")}
    >
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
});
