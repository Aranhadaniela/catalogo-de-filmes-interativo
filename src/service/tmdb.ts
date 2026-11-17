import type { Movie, MovieDetails,MoviesList } from "../types/movie.types";
const baseUrl = "https://api.themoviedb.org/3";

export const imagesUrl = "https://image.tmdb.org/t/p/w500"

export const backdropUrl = "https://image.tmdb.org/t/p/w1280"

export async function getTopMovies(limit = 5): Promise<Movie[]> {
    const res = await fetch(`${baseUrl}/movie/top_rated?language=pt-BR`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    });
    if (!res.ok) throw new Error("Falha ao buscar filmes")
    const data = await res.json()
    return data.results.slice(0, limit);
}

export async function getDetails(id: string): Promise<MovieDetails> {
    const res = await fetch(`${baseUrl}/movie/${id}?language=pt-BR`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
    })
    if (!res.ok) throw new Error("Falha ao buscar detalhes do filme");
    return res.json();
}
export async function getMovies(): Promise<MoviesList> {
    const page = Math.floor(Math.random()*500)+1
    const res = await fetch(`${baseUrl}/movie/popular?language=pt-BR&page=${page}`,
        {   headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
            }
        })
    if (!res.ok) throw new Error('Falha ao buscar filmes')
    return res.json();
}
export async function searchMovies(query: string, page = 1): Promise<MoviesList> {
    const res = await fetch(
        `${baseUrl}/search/movie?language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`,
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } }
    )
    if (!res.ok) throw new Error('Falha ao buscar filmes')
    return res.json();
}