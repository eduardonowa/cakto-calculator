/// <reference types="jest" />
import { screen } from "@testing-library/react";
import { OrderSummary } from "../OrderSummary";
import { renderWithTheme } from "./test-utils";

const mockSummary = {
  grossValue: 297,
  platformFee: 0,
  total: 297,
  producerReceives: 297,
  savingsVsCard: 11.83,
};

describe("OrderSummary", () => {
  it("renders section title", () => {
    renderWithTheme(
      <OrderSummary summary={mockSummary} producerName="João Silva" />
    );
    expect(screen.getByText("Resumo do pedido")).toBeInTheDocument();
  });

  it("renders producer name and receives value", () => {
    renderWithTheme(
      <OrderSummary summary={mockSummary} producerName="João Silva" />
    );
    expect(screen.getByText("João Silva recebe")).toBeInTheDocument();
    expect(screen.getAllByText("R$ 297,00").length).toBeGreaterThanOrEqual(1);
  });

  it("shows savings message when savingsVsCard > 0", () => {
    renderWithTheme(
      <OrderSummary summary={mockSummary} producerName="João Silva" />
    );
    expect(screen.getByText(/Você economiza/)).toBeInTheDocument();
  });

  it("does not show savings when savingsVsCard is zero", () => {
    const summaryNoSavings = { ...mockSummary, savingsVsCard: 0 };
    renderWithTheme(
      <OrderSummary summary={summaryNoSavings} producerName="João" />
    );
    expect(screen.queryByText(/Você economiza/)).not.toBeInTheDocument();
  });
});
