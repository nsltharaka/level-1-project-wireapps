import useAsyncStorage from "@/hooks/useAsyncStorage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type GlobalContext = {
  onboarded: boolean;
  setAsOnboarded: () => Promise<void>;
};

export const GlobalContext = createContext<GlobalContext | undefined>(
  undefined,
);

export function useGlobalContext() {
  const value = useContext(GlobalContext);
  if (!value) {
    throw new Error("component must be wrapped inside GlobalContextProvider");
  }
  return value;
}

export default function GlobalContextProvider({ children }: PropsWithChildren) {
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
      {children}
    </GlobalContext.Provider>
  );
}
