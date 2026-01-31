/// <reference types="jest" />
import { calcularParcelas, getPixSummary, getCardSummary } from "../fees";

describe("calcularParcelas", () => {
  it("returns 1x with 3.99% fee for card full", () => {
    const result = calcularParcelas(297, 1);
    expect(result).toHaveLength(1);
    expect(result[0].installments).toBe(1);
    expect(result[0].feePercent).toBe(3.99);
    expect(result[0].feeAmount).toBeCloseTo(297 * 0.0399, 2);
    expect(result[0].totalWithFee).toBeCloseTo(297 + result[0].feeAmount, 2);
  });

  it("returns 2x with 6.99% (4.99 + 2) for card 2x", () => {
    const result = calcularParcelas(297, 2);
    expect(result[1].installments).toBe(2);
    expect(result[1].feePercent).toBe(6.99);
    expect(result[1].feeAmount).toBeCloseTo(297 * 0.0699, 2);
  });

  it("returns 12 options for maxParcelas 12", () => {
    const result = calcularParcelas(100, 12);
    expect(result).toHaveLength(12);
  });
});

describe("getPixSummary", () => {
  it("returns zero fee and total equals gross", () => {
    const s = getPixSummary(297);
    expect(s.grossValue).toBe(297);
    expect(s.platformFee).toBe(0);
    expect(s.total).toBe(297);
    expect(s.producerReceives).toBe(297);
  });
});

describe("getCardSummary", () => {
  it("returns correct total and fee for 1x", () => {
    const parcelas = calcularParcelas(297, 1);
    const s = getCardSummary(297, parcelas, 1);
    expect(s.platformFee).toBeCloseTo(297 * 0.0399, 2);
    expect(s.total).toBeCloseTo(297 + s.platformFee, 2);
    expect(s.producerReceives).toBe(297);
  });
});
