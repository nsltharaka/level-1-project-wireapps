import { useGlobalContext } from "@/contexts/GlobalContext";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const pages = [
  {
    image: require("@/assets/images/onboarding-1.png"),
    text: "Bringing the best products, inspiration and stories in sport.",
  },
  {
    image: require("@/assets/images/onboarding-2.jpg"),
    text: "Conquer the track, the court, the field - we've got you covered.",
  },
  {
    image: require("@/assets/images/onboarding-3.jpg"),
    text: "Chase your goals with the best underfoot.",
  },
];

export default function Onboarding() {
  const { setAsOnboarded } = useGlobalContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const index = parseInt(id);

  const moveToNextScreen = (screenId: number) => {
    if (screenId + 1 < pages.length) {
      router.replace(`/onboarding/${screenId + 1}`);
      return;
    }

    setAsOnboarded();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={pages[index].image} />

      <View style={styles.description}>
        <Text style={styles.text}>{pages[index].text}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => moveToNextScreen(index)}
        >
          <Text style={styles.buttonText}>
            {pages.length - 1 === index ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  description: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    height: 320,
    justifyContent: "space-between",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    padding: 18,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
});
