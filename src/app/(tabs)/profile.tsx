import ProfileOptionButton from "@/components/profileScreen/ProfileOptionButton";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.avatar}
            source={require("@/assets/images/avatar.png")}
          />
        </View>
        <Text style={styles.userName}>John Smith</Text>
        <View style={styles.optionsContainer}>
          <ProfileOptionButton buttonName="Orders" icon="archive-outline" />
          <ProfileOptionButton buttonName="Pass" icon="ticket-outline" />
          <ProfileOptionButton buttonName="Events" icon="calendar-outline" />
          <ProfileOptionButton buttonName="Settings" icon="settings-outline" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileInfoContainer: {
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  profileImageContainer: {},
  avatar: {
    width: 80,
    aspectRatio: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
});