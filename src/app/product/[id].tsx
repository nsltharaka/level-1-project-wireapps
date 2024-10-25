import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ProductScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>{params.id}</Text>
    </View>
  );
}
