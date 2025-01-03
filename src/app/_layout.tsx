import { GlobalContext } from "@/contexts/GlobalContext";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import type { User } from "@/types/user";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

// keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loading, data, error, setValue } = useAsyncStorage<User>("@userdata");
  const [userData, setUserData] = useState<User>({
    username: "",
    profilePicture: "",
    onboarded: false,
    colorSchemePreference: "system",
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
      setUserData(JSON.parse(data));
    }

    SplashScreen.hideAsync();
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <GlobalContext.Provider value={{ userData, updateUserData }}>
      <Slot />
    </GlobalContext.Provider>
  );
}
