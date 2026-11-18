import type { Movie } from "../types/movie.types";

export const makeMovie = (overrides: Partial<Movie> = {}): Movie => ({
  id: 1,
  title: "Matrix",
  poster_path: "/matrix.jpg",
  backdrop_path: null,
  release_date: "1999-03-31",
  overview: "Um hacker descobre a verdade.",
  vote_average: 8.7,
  vote_count: 1000,
  popularity: 100,
  ...overrides,
});
