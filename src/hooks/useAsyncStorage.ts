import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const useAsyncStorage = <T extends string | object>(key: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // gets the data on mount
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem(key)
      .then((value) => setData(value))
      .catch((err) => {
        console.log("async storage is unavailable. error: \n", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // sets the data
  const setValue = useCallback(
    async (value: T) => {
      try {
        // remove the key if value is null
        if (value == null) {
          await AsyncStorage.removeItem(key);
          return;
        }

        // update the async storage
        if (typeof value === "string") {
          await AsyncStorage.setItem(key, value);
        } else if (typeof data === "object") {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.log("async storage is unavailable. error: \n", error);
      }
    },
    [key],
  );

  return {
    loading,
    data,
    error,
    setValue,
  };
};

export default useAsyncStorage;
