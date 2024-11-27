import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const useAsyncStorage = (key: string) => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // get
  useEffect(() => {
    setLoaded(false);
    AsyncStorage.getItem(key)
      .then((value) => setData(value))
      .catch((err) => {
        console.log("async storage is unavailable. error: \n", err);
        setError(err);
      })
      .finally(() => setLoaded(true));
  }, [key]);

  //set
  const setValue = useCallback(
    async (value: string | null) => {
      setLoaded(false);
      try {
        if (value == null) {
          await AsyncStorage.removeItem(key);
        } else {
          await AsyncStorage.setItem(key, value);
        }
      } catch (error) {
        console.log("async storage is unavailable. error: \n", error);
      } finally {
        setLoaded(true);
      }
    },
    [key],
  );

  return {
    loaded,
    data,
    error,
    setValue,
  };
};

export default useAsyncStorage;
