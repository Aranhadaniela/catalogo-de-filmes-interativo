import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../../service/tmdb";
import type { MovieDetails as MovieDetailsType } from "../../types/movie.types";
import BackdropImage from "../../components/BackdropImage/BackdropImage";
import Back from '../../components/Back/Back';
import { Timer, Star, Users, TrendingUp, Calendar, SearchX } from 'lucide-react';
import FavoriteButton from "@/components/FavoriteButtom/FavoriteButton";

const notFoundStyle = "italic text-white/50";

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetailsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {``
        if (!id) return;
        setLoading(true);
        getDetails(id)
            .then(setMovie)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error || !movie) return (
        <div>
            <Back className="ml-5" />
            <div className="flex flex-col items-center gap-3 px-4 py-24 text-center">
                <SearchX className="h-12 w-12 text-white/60" />
                <p className="text-xl">{error ?? "Filme não encontrado"}</p>
            </div>
        </div>
    );

    const runtime = movie.runtime ? `${movie.runtime} minutos` : null;
    const genres = movie.genres?.length ? movie.genres.map((g) => g.name).join(", ") : null;
    const releaseDate = movie.release_date
        ? new Date(movie.release_date + "T00:00:00").toLocaleDateString("pt-BR")
        : null;
    const hasRating = movie.vote_count > 0;

    return (
        <div>
            <Back className="ml-5" />
            {(movie.backdrop_path || movie.poster_path) && (
                <div className="relative flex justify-center w-full h-150">
                    <BackdropImage className="mt-10 rounded-lg" backdropPath={movie.backdrop_path} posterPath={movie.poster_path} alt={movie.title} />
                    <FavoriteButton className="top-14 right-70 left-auto" movie={movie} />
                </div>)}
            <div className="relative -mt-14 mb-10 flex justify-center">
                <div className="absolute -top-4 h-20 w-180 rounded-full bg-black/80 blur-md" />
                <h1 className="relative text-center font-extrabold text-4xl">{movie.title}</h1>
            </div>
            <div className="flex items-center justify-center">
                <Timer />
                <p className={`ml-3 mb-2 ${runtime ? "" : notFoundStyle}`}>{runtime ?? "Duração não informada"}</p></div>
            <p className={`text-center ${genres ? "" : notFoundStyle}`}>{genres ?? "Gêneros não informados"}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    <span className={hasRating ? "" : notFoundStyle}>{hasRating ? `Nota: ${movie.vote_average.toFixed(1)}` : "Sem avaliações"}</span>
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
                    <span className={releaseDate ? "" : notFoundStyle}>{releaseDate ? `Lançamento: ${releaseDate}` : "Lançamento não informado"}</span>
                </div>
            </div>
            {movie.overview?.trim() && (
                <div className="flex justify-center text-center px-20 py-8">
                    <p className="text-center text-2xl font-light ">{movie.overview}</p></div>
            )}

        </div>
    );
}
