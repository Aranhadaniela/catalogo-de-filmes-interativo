import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("mostra mensagem de erro ao enviar vazio", async () => {
    const onSubmit = vi.fn();
    render(<SearchInput value="" onChange={() => {}} onSubmit={onSubmit} />);

    await userEvent.type(screen.getByRole("textbox"), "{Enter}");

    expect(screen.getByText("Digite algo para buscar.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("envia o termo sem espaços nas pontas", async () => {
    const onSubmit = vi.fn();
    render(
      <SearchInput value="  matrix " onChange={() => {}} onSubmit={onSubmit} />,
    );

    await userEvent.type(screen.getByRole("textbox"), "{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("matrix");
  });

  it("foca no input com Ctrl+K", async () => {
    render(<SearchInput value="" onChange={() => {}} />);
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});
