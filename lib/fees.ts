import type { IParcela } from './types';

const CARD_FULL_FEE_PERCENT = 3.99;
const CARD_INSTALLMENT_BASE_FEE_PERCENT = 4.99;
const CARD_EXTRA_INSTALLMENT_FEE_PERCENT = 2;

export function calcularParcelas(valor: number, maxParcelas: number): IParcela[] {
  const result: IParcela[] = [];

  for (let n = 1; n <= maxParcelas; n++) {
    if (n === 1) {
      const feePercent = CARD_FULL_FEE_PERCENT;
      const feeAmount = (valor * feePercent) / 100;
      const totalWithFee = valor + feeAmount;
      result.push({
        installments: 1,
        installmentValue: totalWithFee,
        totalWithFee,
        feePercent,
        feeAmount,
      });
      continue;
    }

    const extraPercent = (n - 1) * CARD_EXTRA_INSTALLMENT_FEE_PERCENT;
    const feePercent = CARD_INSTALLMENT_BASE_FEE_PERCENT + extraPercent;
    const feeAmount = (valor * feePercent) / 100;
    const totalWithFee = valor + feeAmount;
    const installmentValue = totalWithFee / n;

    result.push({
      installments: n,
      installmentValue,
      totalWithFee,
      feePercent,
      feeAmount,
    });
  }

  return result;
}

export function getPixSummary(grossValue: number) {
  return {
    grossValue,
    platformFee: 0,
    total: grossValue,
    producerReceives: grossValue,
    feePercent: 0,
  };
}

export function getCardSummary(
  grossValue: number,
  parcelas: IParcela[],
  selectedInstallments: number
): {
  grossValue: number;
  platformFee: number;
  total: number;
  producerReceives: number;
  feePercent: number;
} {
  const option = parcelas.find((p) => p.installments === selectedInstallments);
  if (!option) {
    return getPixSummary(grossValue);
  }
  return {
    grossValue,
    platformFee: option.feeAmount,
    total: option.totalWithFee,
    producerReceives: grossValue,
    feePercent: option.feePercent,
  };
}
