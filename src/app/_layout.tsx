import { GlobalContext } from "@/contexts/GlobalContext";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, data, error, setValue } = useAsyncStorage("@onboarded");
  const [onboarded, setOnboarded] = useState(false);

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
      }}
    >
      <Slot />
    </GlobalContext.Provider>
  );
}
