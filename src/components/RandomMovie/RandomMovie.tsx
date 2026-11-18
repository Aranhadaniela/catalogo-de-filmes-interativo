import { useEffect, useRef, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { Dices, X } from "lucide-react";
import { getRandomMovie, imagesUrl } from "../../service/tmdb";
import { routes } from "../../constants/routes";
import type { Movie } from "../../types/movie.types";
import RatingBadge from "../RatingBadge/RatingBadge";
import "./RandomMovie.css";

const MIN_ROLL_MS = 1800;

// Posição dos pontos (grid 3x3) de cada face do dado.
const faces = [
  [4],
  [0, 8],
  [0, 4, 8],
  [0, 2, 6, 8],
  [0, 2, 4, 6, 8],
  [0, 2, 3, 5, 6, 8],
];

type State =
  | { status: "closed" }
  | { status: "rolling" }
  | { status: "done"; movie: Movie }
  | { status: "error"; message: string };

const RandomMovie = () => {
  const [state, setState] = useState<State>({ status: "closed" });
  const run = useRef(0);

  async function roll() {
    const id = ++run.current;
    setState({ status: "rolling" });
    const wait = new Promise((r) => setTimeout(r, MIN_ROLL_MS));
    try {
      const [movie] = await Promise.all([getRandomMovie(), wait]);
      if (id === run.current) setState({ status: "done", movie });
    } catch (err) {
      if (id === run.current)
        setState({ status: "error", message: (err as Error).message });
    }
  }

  function close() {
    run.current++;
    setState({ status: "closed" });
  }

  useEffect(() => {
    if (state.status === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.status]);

  return (
    <>
      <button
        type="button"
        onClick={roll}
        aria-label="Surpreenda-me"
        className="group fixed bottom-10 right-6 z-50 flex items-center gap-3 cursor-pointer"
      >
        <span className="pointer-events-none rounded-full bg-app-quartenary px-4 py-2 text-sm shadow-lg opacity-0 translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
          Surpreenda-me
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-app-quartenary shadow-xl transition-transform group-hover:scale-110">
          <Dices className="h-7 w-7" />
        </span>
      </button>

      {state.status !== "closed" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Surpreenda-me"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[#030018]/95 px-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-5 top-5 cursor-pointer rounded-full p-2 hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-extrabold">Surpreenda-me:</h2>

          {state.status === "rolling" && (
            <>
              <div className="rm-dice-scene" role="img" aria-label="Dado rolando">
                <div className="rm-dice">
                  {faces.map((pips, i) => (
                    <div key={i} className={`rm-face rm-f${i + 1}`}>
                      {Array.from({ length: 9 }, (_, cell) => (
                        <span
                          key={cell}
                          className={pips.includes(cell) ? "rm-pip" : ""}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-neutral-400">Sorteando um filme...</p>
            </>
          )}

          {state.status === "error" && (
            <>
              <p>{state.message}</p>
              <button
                type="button"
                onClick={roll}
                className="cursor-pointer rounded-full bg-app-quartenary px-6 py-2"
              >
                Tentar de novo
              </button>
            </>
          )}

          {state.status === "done" && (
            <div className="rm-reveal flex max-w-sm flex-col items-center gap-4 text-center">
              <div className="relative w-56 overflow-hidden rounded-2xl shadow-2xl">
                {state.movie.poster_path ? (
                  <img
                    src={`${imagesUrl}${state.movie.poster_path}`}
                    alt={state.movie.title}
                    className="w-full"
                  />
                ) : (
                  <div className="flex h-80 items-center justify-center bg-app-terciary">
                    Sem poster :(
                  </div>
                )}
                <RatingBadge rating={state.movie.vote_average} />
              </div>
              <h3 className="text-xl font-extrabold">{state.movie.title}</h3>
              <div className="flex gap-3">
                <Link
                  to={generatePath(routes.movieDetails, {
                    id: String(state.movie.id),
                  })}
                  onClick={close}
                  className="rounded-full bg-app-quartenary px-6 py-2"
                >
                  Ver detalhes
                </Link>
                <button
                  type="button"
                  onClick={roll}
                  className="cursor-pointer rounded-full border border-white/30 px-6 py-2 hover:bg-white/10"
                >
                  Sortear de novo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RandomMovie;
