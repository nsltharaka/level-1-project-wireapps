import type { Product } from "@/types/product";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export const FavoritesContext = createContext<{
  favorites: Set<Product["id"]>;
  isInFavorites: (id: Product["id"]) => boolean;
  addToFavorites: (id: Product["id"]) => void;
  removeFromFavorites: (id: Product["id"]) => void;
} | null>(null);

export default function FavoritesContextProvider({
  children,
}: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Set<Product["id"]>>(new Set());

  const addToFavorites = (productId: Product["id"]) => {
    setFavorites((prev) => new Set([...prev.values(), productId]));
  };

  const removeFromFavorites = (productId: Product["id"]) => {
    setFavorites(
      (prev) => new Set([...prev.values()].filter((id) => id !== productId)),
    );
  };

  const isInFavorites = (id: Product["id"]) => favorites.has(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isInFavorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error(
      "component must be wrapped inside FavoritesContextProvider",
    );
  }
  return value;
}
