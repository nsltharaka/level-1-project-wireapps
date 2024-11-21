import { createContext, useContext, type PropsWithChildren } from "react";

type GlobalContext = {};

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
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
