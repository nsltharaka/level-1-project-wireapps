import { GlobalContext } from "@/contexts/GlobalContext";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import type { User } from "@/types/user";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading, data, error, setValue } = useAsyncStorage<User>("@userdata");
  const [userData, setUserData] = useState<User>({
    username: "",
    profilePicture: "",
    onboarded: false,
    colorSchemePreference: null,
  });

  const updateUserData = <T extends keyof User>(key: T, value: User[T]) => {
    setUserData((prev) => {
      const updatedData = { ...prev, [key]: value };
      setValue(updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (!loading && data) {
      const userDataObj = JSON.parse(data) as User;
      setUserData(userDataObj);

      const colorScheme = userDataObj.colorSchemePreference;
      if (colorScheme) {
        Appearance.setColorScheme(colorScheme);
      }
    }

    SplashScreen.hideAsync();
  }, [loading]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      updateUserData("colorSchemePreference", colorScheme);
    });

    return () => subscription.remove();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <GlobalContext.Provider value={{ userData, updateUserData }}>
      <Slot />
    </GlobalContext.Provider>
  );
}
