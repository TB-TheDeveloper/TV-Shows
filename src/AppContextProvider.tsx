import { createContext, useMemo, useState } from "react";

interface AppContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  toggleFavorite: (id: number) => void;
}

export const AppContext = createContext<AppContextType>({
  favorites: [],
  isFavorite: () => false,
  setFavorites: () => [],
  toggleFavorite: () => {},
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      const updated = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, setFavorites }),
    [favorites],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
