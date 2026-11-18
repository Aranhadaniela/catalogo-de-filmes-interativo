import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { FavoritesProvider, useFavorites } from "./MyFavContexts";
import { makeMovie } from "../test/fixtures";

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe("FavoritesProvider", () => {
  it("começa vazio", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it("adiciona e remove um favorito", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    const movie = makeMovie();

    act(() => result.current.changeFavorite(movie));
    expect(result.current.isFavorite(movie.id)).toBe(true);

    act(() => result.current.changeFavorite(movie));
    expect(result.current.isFavorite(movie.id)).toBe(false);
  });

  it("persiste os favoritos no localStorage", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    act(() => result.current.changeFavorite(makeMovie({ id: 7 })));

    const saved = JSON.parse(localStorage.getItem("favorites")!);
    expect(saved).toHaveLength(1);
    expect(saved[0].id).toBe(7);
  });

  it("carrega favoritos salvos anteriormente", () => {
    localStorage.setItem("favorites", JSON.stringify([makeMovie({ id: 3 })]));
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.isFavorite(3)).toBe(true);
  });

  it("ignora JSON inválido no localStorage", () => {
    localStorage.setItem("favorites", "{quebrado");
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it("lança erro ao usar o hook fora do provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useFavorites())).toThrow();
  });
});
