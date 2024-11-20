import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ProfileOptionButtonProps = {
  buttonName: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

export default function ProfileOptionButton({
  buttonName,
  icon,
}: ProfileOptionButtonProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name={icon} size={28} color={"#767676"} />
      <Text style={styles.buttonName}>{buttonName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
  },
  buttonName: {
    fontSize: 14,
  },
});
