/// <reference types="jest" />
import { screen, fireEvent } from "@testing-library/react";
import { SuccessDialog } from "../SuccessDialog";
import { renderWithTheme } from "./test-utils";

describe("SuccessDialog", () => {
  it("renders nothing when closed", () => {
    renderWithTheme(<SuccessDialog open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title and message when open", () => {
    renderWithTheme(<SuccessDialog open onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Compra realizada!")).toBeInTheDocument();
    expect(
      screen.getByText(/Obrigado pela sua compra/)
    ).toBeInTheDocument();
  });

  it("renders custom title and close label", () => {
    renderWithTheme(
      <SuccessDialog
        open
        onClose={() => {}}
        title="Sucesso!"
        closeLabel="OK"
      />
    );
    expect(screen.getByText("Sucesso!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    renderWithTheme(<SuccessDialog open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
