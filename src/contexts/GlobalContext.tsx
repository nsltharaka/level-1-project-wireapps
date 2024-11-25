import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type GlobalContext = {
  onboarded: boolean;
  setOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [onboarded, setOnboarded] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        onboarded,
        setOnboarded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
