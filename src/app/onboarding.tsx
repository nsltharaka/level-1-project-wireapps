import { useGlobalContext } from "@/contexts/GlobalContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  const { setOnboarded } = useGlobalContext();

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          setOnboarded(true);
          router.replace("/");
        }}
      >
        set onboarded
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
