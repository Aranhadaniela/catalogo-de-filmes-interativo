import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Favorites from "./Favorites";
import { FavoritesProvider } from "../../context/MyFavContexts";
import { makeMovie } from "../../test/fixtures";

const renderPage = () =>
  render(
    <MemoryRouter>
      <FavoritesProvider>
        <Favorites />
      </FavoritesProvider>
    </MemoryRouter>,
  );

describe("Favorites page", () => {
  it("mostra mensagem quando não há favoritos", () => {
    renderPage();
    expect(
      screen.getByText("Você ainda não favoritou nenhum filme."),
    ).toBeInTheDocument();
  });

  it("filtra os favoritos pelo título", async () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([
        makeMovie({ id: 1, title: "Matrix" }),
        makeMovie({ id: 2, title: "Titanic" }),
      ]),
    );
    renderPage();

    await userEvent.type(screen.getByRole("textbox"), "tita");

    expect(screen.queryByText("Matrix")).not.toBeInTheDocument();
    expect(screen.getByText("Titanic")).toBeInTheDocument();
  });
});
