import { Stack } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  const [editMode, setEditMode] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={() => setEditMode((prev) => !prev)}
              title={editMode ? "Done" : "Edit"}
            />
          ),
        }}
      />
      <Text>FavoritesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
