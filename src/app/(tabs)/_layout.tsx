import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="(homeStack)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(storeStack)"
        options={{
          headerShown: false,
          title: "Store",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(favoritesStack)"
        options={{
          headerShown: false,
          title: "Favorites",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
