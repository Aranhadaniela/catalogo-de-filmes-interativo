import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie.types";

interface FavoritesContext {
  favorites: Movie[];
  isFavorite: (id: number) => boolean;
  changeFavorite: (movie: Movie) => void;
}
const key = "favorites";
const FavoritesContext = createContext<FavoritesContext | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);
  function loadFavorites(): Movie[] {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  const changeFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      setFavorites((nf) => nf.filter((m) => m.id !== movie.id));
    } else {
      setFavorites((f) => [...f, movie]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, changeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
export function useFavorites() {
  const cntxt = useContext(FavoritesContext);
  if (!cntxt)
    throw new Error(
      "erro de uso no contexto,precisa estar dentro de FavoritesProvider",
    );
  return cntxt;
}
