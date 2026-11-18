import MovieCarrousel from "../../components/MovieCarrosel/MovieCarrosel";
import { useEffect, useState } from "react";
import { getMovies, imagesUrl, searchMovies } from "../../service/tmdb";
import type { Movie } from "../../types/movie.types";
import Card from "../../components/Card/Card";
import { Star } from "lucide-react";
import FavoriteButton from "../../components/FavoriteButtom/FavoriteButton";
import SearchInput from "@/components/SearchInput/SearchInput";
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<Movie[]>([]);
  useEffect(() => {
    getMovies()
      .then((data) => setMovies(data.results))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!searchTerm) return;
    let ignore = false;
    setResults([]);
    setSearching(true);
    setSearchError(null);
    searchMovies(searchTerm)
      .then((data) => setResults(data.results))
      .catch((err: Error) => setSearchError(err.message))
      .finally(() => {
        if (!ignore) setSearching(false);
      });
    return () => {
      ignore = true;
    };
  }, [searchTerm]);
  return (
    <div>
      <div className="mt-6 flex justify-center px-4">
        <SearchInput
          value={query}
          onChange={(v) => {
            setQuery(v);
            if (!v.trim()) setSearchTerm("");
          }}
          onSubmit={setSearchTerm}
        />
      </div>
      {searchTerm ? (
        <div className="mx-auto w-full max-w-6xl px-4">
          <h1 className="text-2xl font-extrabold mt-8">
            Resultados para "{searchTerm}"
          </h1>

          {searching && <p className="mt-6">Buscando...</p>}
          {searchError && <p className="mt-6">{searchError}</p>}
          {!searching && !searchError && results.length === 0 && (
            <p className="mt-6">Nenhum filme encontrado</p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {results.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.title}
                posterPath={
                  movie.poster_path
                    ? `${imagesUrl}${movie.poster_path}`
                    : undefined
                }
              >
                <FavoriteButton movie={movie} />
                <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-white">
                  <Star className="h-3 w-3 text-amber-400" />
                  {movie.vote_average.toFixed(1)}
                </div>
              </Card>
            ))}
          </div>
          {!searching && results.length > 0 && (
            <p className="mt-10 text-center text-neutral-400">
              Fim da página :)
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mx-auto w-full max-w-6xl px-4">
            <h1 className="text-2xl font-extrabold mt-8 ml-30 text-left">
              Mais avaliados
            </h1>
          </div>
          <div className="w-full mt-7 flex justify-center">
            <MovieCarrousel />
          </div>
          <div className="mx-auto w-full max-w-6xl px-4">
            <h1 className="text-2xl font-extrabold mt-10 text-left">
              Populares
            </h1>

            {loading && <p>Carregando filmes...</p>}
            {error && <p>{error}</p>}

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {movies.map((movie) => (
                <Card
                  key={movie.id}
                  id={movie.id}
                  name={movie.title}
                  posterPath={
                    movie.poster_path
                      ? `${imagesUrl}${movie.poster_path}`
                      : undefined
                  }
                >
                  <FavoriteButton movie={movie} />
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-white">
                    <Star className="h-3 w-3 text-amber-400" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                </Card>
              ))}
            </div>
            {!loading && movies.length > 0 && (
              <p className="mt-10 text-center text-neutral-400">
                Fim da página :)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
