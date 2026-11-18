import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../../service/tmdb";
import type { MovieDetails as MovieDetailsType } from "../../types/movie.types";
import BackdropImage from "../../components/BackdropImage/BackdropImage";
import Back from "../../components/Back/Back";
import {
    Timer,
    Star,
    Users,
    TrendingUp,
    Calendar,
    SearchX,
} from "lucide-react";
import FavoriteButton from "@/components/FavoriteButtom/FavoriteButton";

const notFoundStyle = "italic text-white/50";

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const [result, setResult] = useState<{
        id: string;
        movie: MovieDetailsType | null;
        error: string | null;
    } | null>(null);

    useEffect(() => {
        if (!id) return;
        let ignore = false;
        getDetails(id)
            .then((movie) => !ignore && setResult({ id, movie, error: null }))
            .catch(
                (err: Error) =>
                    !ignore && setResult({ id, movie: null, error: err.message }),
            );
        return () => {
            ignore = true;
        };
    }, [id]);

    const loading = !!id && result?.id !== id;
    const movie = result && result.id === id ? result.movie : null;
    const error = result && result.id === id ? result.error : null;

    if (loading) return <p>Carregando...</p>;
    if (error || !movie)
        return (
            <div>
                <Back className="ml-5" />
                <div className="flex flex-col items-center gap-3 px-4 py-24 text-center">
                    <SearchX className="h-12 w-12 text-white/60" />
                    <p className="text-xl">{error ?? "Filme não encontrado"}</p>
                </div>
            </div>
        );

    const runtime = movie.runtime ? `${movie.runtime} minutos` : null;
    const genres = movie.genres?.length
        ? movie.genres.map((g) => g.name).join(", ")
        : null;
    const releaseDate = movie.release_date
        ? new Date(movie.release_date + "T00:00:00").toLocaleDateString("pt-BR")
        : null;
    const hasRating = movie.vote_count > 0;

    return (
        <div className="flex min-h-screen flex-col justify-center pb-24">
            {!(movie.backdrop_path || movie.poster_path) && (
                <Back className="ml-5" />
            )}
            {(movie.backdrop_path || movie.poster_path) && (
                <div className="flex justify-center w-full px-4">
                    <div className="relative mt-6 w-full max-w-7xl overflow-hidden rounded-lg">
                        <Back className="absolute top-1 left-2 z-20 bg-black/50 p-1" />
                        <BackdropImage
                            className="block w-full aspect-video object-cover"
                            backdropPath={movie.backdrop_path}
                            posterPath={movie.poster_path}
                            alt={movie.title}
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                        <h1 className="absolute inset-x-0 bottom-4 px-4 text-center font-extrabold text-4xl drop-shadow-lg">
                            {movie.title}
                        </h1>
                        <FavoriteButton className="top-2 right-2 left-auto" movie={movie} />
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center mt-6 text-xl">
                <Timer />
                <p className={`ml-1 py-2 ${runtime ? "" : notFoundStyle}`}>
                    {runtime ?? "Duração não informada"}
                </p>
            </div>
            <p className={`text-center text-lg ${genres ? "" : notFoundStyle}`}>
                {genres ?? "Gêneros não informados"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-6 text-lg">
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    <span className={hasRating ? "" : notFoundStyle}>
                        {hasRating
                            ? `Nota: ${movie.vote_average.toFixed(1)}`
                            : "Sem avaliações"}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Votos: {movie.vote_count}</span>
                </div>
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Popularidade: {movie.popularity.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className={releaseDate ? "" : notFoundStyle}>
                        {releaseDate
                            ? `Lançamento: ${releaseDate}`
                            : "Lançamento não informado"}
                    </span>
                </div>
            </div>
            {movie.overview?.trim() && (
                <div className="mx-auto w-full max-w-4xl px-6 py-10">
                    <p className="text-center text-2xl font-light">{movie.overview}</p>
                </div>
            )}
        </div>
    );
}
