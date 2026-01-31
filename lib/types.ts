export interface IProduct {
  id: number;
  name: string;
  originalPrice: number;
  currentPrice: number;
  producer: string;
  format: string;
  deliveryTime: string;
}

export type IPaymentMethod = 'pix' | 'card';

export interface IParcela {
  installments: number;
  installmentValue: number;
  totalWithFee: number;
  feePercent: number;
  feeAmount: number;
}

export interface IOrderSummaryDisplay {
  grossValue: number;
  platformFee: number;
  total: number;
  producerReceives: number;
  savingsVsCard?: number;
}
