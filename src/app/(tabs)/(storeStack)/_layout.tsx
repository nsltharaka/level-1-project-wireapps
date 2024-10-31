import CartIcon from "@/components/cart/CartIcon";
import { IOS_DEFAULT_BACKGROUND_COLOR } from "@/constants/defaultStyles";
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
            backgroundColor: IOS_DEFAULT_BACKGROUND_COLOR,
          },
          headerRight: () => <CartIcon />,
        }}
      />
    </Stack>
  );
}
