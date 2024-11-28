import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function StoreStack() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerShadowVisible: false,
          title: "Favorites",
          headerTitleStyle: {
            color: Colors[colorScheme ?? "light"].text,
          },
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].baseBackground,
          },
        }}
      />
    </Stack>
  );
}
