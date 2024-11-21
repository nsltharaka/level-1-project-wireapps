import GlobalContextProvider from "@/contexts/GlobalContext";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      // intentional delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // hide splash screen
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <GlobalContextProvider>
      <Slot />
    </GlobalContextProvider>
  );
}
