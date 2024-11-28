import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import ProfileOptionButton from "@/components/profileScreen/ProfileOptionButton";
import { ThemedText } from "@/components/ThemedText";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/avatar.png")}
          />
        </View>
        <ThemedText style={styles.userName}>John Smith</ThemedText>
        <View style={styles.optionsContainer}>
          <ProfileOptionButton buttonName="Orders" icon="archive-outline" />
          <ProfileOptionButton buttonName="Pass" icon="ticket-outline" />
          <ProfileOptionButton buttonName="Events" icon="calendar-outline" />
        </View>
      </View>
      <Button title="clear async storage" onPress={clearAsyncStorage} />
      {/* <Switch value={isDarkTheme} onValueChange={toggleDarkTheme} /> */}
    </ThemedSafeAreaView>
  );
}

const clearAsyncStorage = async () => {
  await AsyncStorage.removeItem("@onboarded");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    alignItems: "center",
    gap: sizeConstants.flexGapLarge,
    padding: sizeConstants.flexGapLarge,
  },
  profileImageContainer: {},
  avatar: {
    width: 80,
    aspectRatio: 1,
  },
  userName: {
    fontSize: fontConstants.sizeLarge,
    fontWeight: fontConstants.weightSemiBold,
  },
  optionsContainer: {
    width: sizeConstants.widthFullScreen,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: sizeConstants.marginLarge,
  },
});
