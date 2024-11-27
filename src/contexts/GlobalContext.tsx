import { createContext, useContext } from "react";

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
