/// <reference types="jest" />
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../ProductCard";
import type { IProduct } from "@/lib/types";

const mockProduct: IProduct = {
  id: 1,
  name: "Curso Teste",
  originalPrice: 500,
  currentPrice: 299,
  producer: "Fulano",
  format: "digital",
  deliveryTime: "imediato",
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Curso Teste"
    );
  });

  it("renders original and current price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/De R\$/)).toBeInTheDocument();
    expect(screen.getByText(/por/)).toBeInTheDocument();
    expect(screen.getByText("R$ 299,00")).toBeInTheDocument();
  });
});
