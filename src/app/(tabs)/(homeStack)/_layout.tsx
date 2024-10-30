import { Stack } from "expo-router";

export default function RootStack() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Shop" }} />
        </Stack>
    );
}