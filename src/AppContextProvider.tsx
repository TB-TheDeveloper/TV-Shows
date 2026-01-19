import { createContext, useEffect, useMemo, useState } from "react";
import type { Shows } from "./Types";

interface AppContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  setShows: React.Dispatch<React.SetStateAction<Shows[]>>;
  shows: Shows[];
  toggleFavorite: (id: number) => void;
}

export const AppContext = createContext<AppContextType>({
  favorites: [],
  isFavorite: () => false,
  setFavorites: () => [],
  setShows: () => [],
  toggleFavorite: () => {},
  shows: [],
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shows, setShows] = useState<Shows[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updated = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const isFavorite = (id: number) => favorites.includes(id);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      setFavorites,
      shows,
      setShows,
    }),
    [favorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
