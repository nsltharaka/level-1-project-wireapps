import type { User } from "@/types/user";
import { createContext, useContext } from "react";

type GlobalContext = {
  userData: User;
  updateUserData: <T extends keyof User>(key: T, value: User[T]) => void;
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
