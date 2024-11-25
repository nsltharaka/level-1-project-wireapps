import { colorConstants } from "@/theme/styleConstants";
import { Stack } from "expo-router";
import React from "react";

export default function StoreStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerShadowVisible: false,
          title: "Favorites",
          headerLargeStyle: {
            backgroundColor: colorConstants.backgroundDefaultIOS,
          },
        }}
      />
    </Stack>
  );
}
