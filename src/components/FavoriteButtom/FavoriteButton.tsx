import { Heart } from "lucide-react";
import { useFavorites } from "../../context/MyFavContexts";
import type { Movie } from "../../types/movie.types";

export default function FavoriteButton({
  movie,
  className = "",
}: {
  movie: Movie;
  className?: string;
}) {
  const { isFavorite, changeFavorite } = useFavorites();
  const active = isFavorite(movie.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        changeFavorite(movie);
      }}
      className={`absolute top-2 left-2 z-20 cursor-pointer rounded-full bg-black/50 p-2 ${className}`}
    >
      <Heart
        className={`h-5 w-5 ${active ? "fill-red-500 text-red-500" : "text-white"}`}
      />
    </button>
  );
}
