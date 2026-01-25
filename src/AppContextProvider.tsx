import { createContext, useEffect, useMemo, useState } from "react";

import type { Cast, Gallery, Show } from "./Types";

interface AppContextType {
  favorites: number[];
  casts: Cast[];
  gallery: Gallery[];
  isFavorite: (id: number) => boolean;
  displayedShows: Show[];
  searchTerm: string;
  setCasts: React.Dispatch<React.SetStateAction<Cast[]>>;
  setDisplayedShows: React.Dispatch<React.SetStateAction<Show[]>>;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  setGallery: React.Dispatch<React.SetStateAction<Gallery[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setShows: React.Dispatch<React.SetStateAction<Show[]>>;
  shows: Show[];
  toggleFavorite: (id: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType>({
  casts: [],
  displayedShows: [],
  favorites: [],
  gallery: [],
  isFavorite: () => false,
  searchTerm: "",
  setCasts: () => [],
  setDisplayedShows: () => [],
  setFavorites: () => [],
  setGallery: () => [],
  setSearchTerm: () => [],
  setShows: () => [],
  toggleFavorite: () => {},
  shows: [],
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedShows, setDisplayedShows] = useState<Show[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);

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
      casts,
      displayedShows,
      favorites,
      gallery,
      isFavorite,
      searchTerm,
      setCasts,
      setFavorites,
      setDisplayedShows,
      setGallery,
      setSearchTerm,
      shows,
      setShows,
      toggleFavorite,
    }),
    // no need to add isFavorites, this is just a function that uses favorites
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [casts, displayedShows, favorites, gallery, searchTerm, shows],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
