import { GlobalContext } from "@/contexts/GlobalContext";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, data, error, setValue } = useAsyncStorage("@onboarded");
  const [onboarded, setOnboarded] = useState(false);

  const isDarkTheme = useColorScheme() === "dark";

  const toggleDarkTheme = () => {
    Appearance.setColorScheme(isDarkTheme ? "light" : "dark");
  };

  const setAsOnboarded = async () => {
    setValue("1");
    setOnboarded(true);
  };

  useEffect(() => {
    if (data && data === "1") {
      setOnboarded(true);
    }
    if (error) {
      console.log(error);
    }

    SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalContext.Provider
      value={{
        onboarded,
        setAsOnboarded,
        isDarkTheme,
        toggleDarkTheme,
      }}
    >
      <Slot />
    </GlobalContext.Provider>
  );
}
