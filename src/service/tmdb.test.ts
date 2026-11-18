import { getDetails, getMovies, getTopMovies, searchMovies } from "./tmdb";

const mockFetch = (body: unknown, ok = true) => {
  const fn = vi.fn().mockResolvedValue({ ok, json: async () => body });
  vi.stubGlobal("fetch", fn);
  return fn;
};

afterEach(() => vi.unstubAllGlobals());

describe("tmdb service", () => {
  it("getTopMovies respeita o limite", async () => {
    mockFetch({ results: [{ id: 1 }, { id: 2 }, { id: 3 }] });
    expect(await getTopMovies(2)).toHaveLength(2);
  });

  it("searchMovies codifica a query na URL", async () => {
    const fetchMock = mockFetch({ results: [] });
    await searchMovies("a&b c");
    expect(fetchMock.mock.calls[0][0]).toContain("query=a%26b%20c");
  });

  it("getDetails busca o filme pelo id", async () => {
    const fetchMock = mockFetch({ id: 42 });
    await getDetails("42");
    expect(fetchMock.mock.calls[0][0]).toContain("/movie/42");
  });

  it("getMovies pede uma página entre 1 e 500", async () => {
    const fetchMock = mockFetch({ results: [] });
    await getMovies();
    const page = Number(/page=(\d+)/.exec(fetchMock.mock.calls[0][0])![1]);
    expect(page).toBeGreaterThanOrEqual(1);
    expect(page).toBeLessThanOrEqual(500);
  });

  it("lança erro quando a API responde com falha", async () => {
    mockFetch({}, false);
    await expect(searchMovies("x")).rejects.toThrow("Falha ao buscar filmes");
    await expect(getDetails("1")).rejects.toThrow(
      "Falha ao buscar detalhes do filme",
    );
  });
});
