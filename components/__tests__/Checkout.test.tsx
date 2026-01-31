/// <reference types="jest" />
import { render, screen } from "@testing-library/react";
import { Checkout } from "../Checkout";
import { MOCK_PRODUCT } from "@/lib/product";
import { renderWithTheme } from "./test-utils";

describe("Checkout", () => {
  it("renders product name from props", () => {
    renderWithTheme(<Checkout product={MOCK_PRODUCT} />);
    expect(
      screen.getByRole("heading", { name: /Curso de Marketing Digital 2025/i })
    ).toBeInTheDocument();
  });

  it("renders personal data section", () => {
    renderWithTheme(<Checkout product={MOCK_PRODUCT} />);
    expect(screen.getByText("Dados pessoais")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/)).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
  });

  it("renders payment section with PIX and Cartão", () => {
    renderWithTheme(<Checkout product={MOCK_PRODUCT} />);
    expect(screen.getByText("Pagamento")).toBeInTheDocument();
    expect(screen.getByLabelText(/PIX/)).toBeInTheDocument();
    expect(screen.getByLabelText("Cartão")).toBeInTheDocument();
  });

  it("renders order summary section", () => {
    renderWithTheme(<Checkout product={MOCK_PRODUCT} />);
    expect(screen.getByText("Resumo do pedido")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderWithTheme(<Checkout product={MOCK_PRODUCT} />);
    expect(
      screen.getByRole("button", { name: /Finalizar Compra/ })
    ).toBeInTheDocument();
  });
});
