import CartIcon from "@/components/cart/CartIcon";
import { colorConstants } from "@/theme/styleConstants";
import { Stack } from "expo-router";
import React from "react";

export default function StoreStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Store",
          headerShadowVisible: false,
          headerLargeTitle: true,
          headerLargeStyle: {
            backgroundColor: colorConstants.backgroundDefaultIOS,
          },
          headerRight: () => <CartIcon />,
        }}
      />
    </Stack>
  );
}
