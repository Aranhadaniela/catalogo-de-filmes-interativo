export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;//cena
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count:number;
  popularity:number;
}
export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
}
export interface MoviesList {
  page: number
  results: Movie[];
  total_pages: number;
  total_results: number;
}
