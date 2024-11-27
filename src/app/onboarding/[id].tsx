import { useGlobalContext } from "@/contexts/GlobalContext";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
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
    width: sizeConstants.widthFullScreen,
    height: "100%",
    objectFit: "cover",
  },
  description: {
    position: "absolute",
    bottom: 100,
    width: sizeConstants.widthFullScreen,
    height: 260,
    justifyContent: "space-between",
    padding: sizeConstants.paddingLarge,
  },
  text: {
    color: colorConstants.white,
    fontSize: fontConstants.sizeHeaderTitle,
    fontWeight: fontConstants.weightBold,
  },
  button: {
    backgroundColor: colorConstants.white,
    padding: sizeConstants.paddingLarge,
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: colorConstants.black,
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeMedium,
  },
});
