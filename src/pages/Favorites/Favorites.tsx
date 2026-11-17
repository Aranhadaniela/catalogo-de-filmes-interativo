import Card from "../../components/Card/Card";
import FavoriteButton from "../../components/FavoriteButtom/FavoriteButton";
import { useFavorites } from "../../context/MyFavContexts";
import { imagesUrl } from "../../service/tmdb";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useState } from "react";
const Favorites = () => {
  const { favorites } = useFavorites();
  const [search, setSearch] = useState("")
  const filtered = favorites.filter((m) =>
    m.title.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <h1 className="text-2xl font-extrabold mt-8">Favoritos</h1>
      <div className="mt-6 flex justify-center">
        <SearchInput value={search} onChange={setSearch} placeholder="Filtrar favoritos..."
          requiredMessage="Digite o nome de um filme para filtrar." />
      </div>
      {favorites.length === 0 && (
        <p className="mt-6">Você ainda não favoritou nenhum filme.</p>
      )}
      {favorites.length > 0 && filtered.length === 0 && (
        <p className="mt-6">Nenhum favorito encontrado para "{search}".</p>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {filtered.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            name={movie.title}
            posterPath={movie.poster_path ? `${imagesUrl}${movie.poster_path}` : undefined}
          >
            <FavoriteButton movie={movie} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;