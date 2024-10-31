import { createContext, useState, type PropsWithChildren } from "react";

interface GlobalContext {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const GlobalContext = createContext<GlobalContext | null>(null);
export default function GlobalContextProvider({ children }: PropsWithChildren) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  <GlobalContext.Provider value={{ searchKeyword, setSearchKeyword }}>
    {children}
  </GlobalContext.Provider>;
}
