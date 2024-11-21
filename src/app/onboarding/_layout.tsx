import { Stack } from "expo-router";
import React from "react";

export default function OnboardScreenLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
