import { IOS_DEFAULT_BACKGROUND_COLOR } from "@/constants/defaultStyles";
import { Stack } from "expo-router";

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Explore",
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: IOS_DEFAULT_BACKGROUND_COLOR,
          },
        }}
      />
    </Stack>
  );
}
