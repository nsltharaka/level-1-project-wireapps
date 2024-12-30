import ThemedSafeAreaView from "@/components/containers/ThemedSafeAreaView";
import SettingOption from "@/components/profileScreen/SettingOption";
import { ThemedText } from "@/components/ThemedText";
import { useGlobalContext } from "@/contexts/GlobalContext";
import useImagePicker from "@/hooks/useImagePicker";
import { fontConstants, sizeConstants } from "@/theme/styleConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const placeholderImage = require("@/assets/images/avatar.png");

export default function ProfileScreen() {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();
  const { pickImageAsync } = useImagePicker();

  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string>("John Smith");

  const onImagePicked = async () => {
    const image = await pickImageAsync();
    if (image) {
      setProfileImage(image);
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={onImagePicked}
        >
          <Image
            style={styles.avatar}
            source={profileImage ? { uri: profileImage } : placeholderImage}
          />
        </TouchableOpacity>
        <ThemedText style={styles.userName}>{userName}</ThemedText>
        <Button
          title="edit profile"
          onPress={() => {
            Alert.prompt(
              "Username",
              "Enter your username",
              [
                { text: "cancel", style: "destructive", onPress: () => {} },
                {
                  text: "save",
                  onPress: (name) => {
                    if (name) setUserName(name);
                  },
                },
              ],
              "plain-text",
              userName || "John Smith",
            );
          }}
        />
        {/* <View style={styles.optionsContainer}>
          <ProfileOptionButton buttonName="Orders" icon="archive-outline" />
          <ProfileOptionButton buttonName="Pass" icon="ticket-outline" />
          <ProfileOptionButton buttonName="Events" icon="calendar-outline" />
        </View> */}
      </View>
      <View style={styles.settingsPanel}>
        <SettingOption
          title="Dark mode"
          value={isDarkTheme}
          onToggle={toggleDarkTheme}
        />
        <Button title="clear async storage" onPress={clearAsyncStorage} />
      </View>
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
  profileImageContainer: {
    width: 80,
    borderRadius: 100,
    overflow: "hidden",
  },
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
  settingsPanel: {},
});
