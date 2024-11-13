import { Stack } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerRight: () => <Button title="Edit" />,
        }}
      />
      <Text>FavoritesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
