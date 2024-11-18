import { IOS_DEFAULT_BACKGROUND_COLOR } from "@/constants/defaultStyles";
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
            backgroundColor: IOS_DEFAULT_BACKGROUND_COLOR,
          },
        }}
      />
    </Stack>
  );
}
