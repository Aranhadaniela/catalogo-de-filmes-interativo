import { useEffect, useState } from "react";
import { getTopMovies } from "../../service/tmdb";
import BackdropImage from "../BackdropImage/BackdropImage";
import type { Movie } from "../../types/movie.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../constants/routes";
export default function MovieCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopMovies(5)
      .then(setMovies)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando filmes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Carousel className="w-full max-w-4xl" opts={{ loop: true }}>
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="basis-full">
            <Link
              to={generatePath(routes.movieDetails, { id: String(movie.id) })}
              className="group relative overflow-hidden rounded-lg"
            >
              <BackdropImage
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                alt={movie.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-x-0 -bottom-1 h-35 bg-linear-to-t from-app-terciary to-transparent" />
              <div className="pointer-events-none absolute inset-0 transition-shadow duration-500 group-hover:inset-shadow-[0_0_80px_rgba(0,0,0,0.7)]" />

              <h2 className="absolute bottom-4 left-4 max-w-[65%] truncate text-lg font-bold text-white sm:text-2xl">
                {movie.title}
              </h2>
              <div className="absolute bottom-[17.5px] right-14 text-amber-400">
                <Star />
              </div>
              <p className="absolute bottom-4 right-6">
                {movie.vote_average.toFixed(1)}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-1/2 left-2 lg:-left-12" />
      <CarouselNext className="top-1/2 right-2 lg:-right-12" />
    </Carousel>
  );
}
