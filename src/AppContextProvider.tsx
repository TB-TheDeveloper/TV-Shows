import { createContext, useEffect, useMemo, useState } from "react";

import type { Shows } from "./Types";

interface AppContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  displayedShows: Shows[];
  searchTerm: string;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  setDisplayedShows: React.Dispatch<React.SetStateAction<Shows[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setShows: React.Dispatch<React.SetStateAction<Shows[]>>;
  shows: Shows[];
  toggleFavorite: (id: number) => void;
}

export const AppContext = createContext<AppContextType>({
  favorites: [],
  isFavorite: () => false,
  displayedShows: [],
  searchTerm: "",
  setFavorites: () => [],
  setDisplayedShows: () => [],
  setSearchTerm: () => [],
  setShows: () => [],
  toggleFavorite: () => {},
  shows: [],
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shows, setShows] = useState<Shows[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedShows, setDisplayedShows] = useState<Shows[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updated = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // if page is refreshed when on favorites, load from localStorage
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
      displayedShows,
      searchTerm,
      setFavorites,
      setDisplayedShows,
      setSearchTerm,
      shows,
      setShows,
    }),
    // no need to add isFavorites, this is just a function that uses favorites
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favorites, displayedShows, searchTerm, shows],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
