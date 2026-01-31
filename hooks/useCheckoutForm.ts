'use client';

import { useCallback, useMemo, useState } from 'react';
import type { IProduct } from '@/lib/types';
import type { IPaymentMethod } from '@/lib/types';
import type { IOrderSummaryDisplay } from '@/lib/types';
import { calcularParcelas, getPixSummary, getCardSummary } from '@/lib/fees';
import { maskCpf, stripCpf, validateCpf } from '@/lib/cpf';

const MAX_INSTALLMENTS = 12;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MOCK_ERROR_EMAIL = 'erro@teste.com';

export function useCheckoutForm(product: IProduct) {
  const [email, setEmail] = useState('');
  const [cpfRaw, setCpfRaw] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>('pix');
  const [installments, setInstallments] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const emailError = useMemo(() => {
    if (!email) return null;
    return emailRegex.test(email) ? null : 'E-mail inválido';
  }, [email]);

  const cpfError = useMemo(() => {
    const digits = stripCpf(cpfRaw);
    if (digits.length === 0) return null;
    if (digits.length < 11) return 'CPF deve ter 11 dígitos';
    return validateCpf(cpfRaw) ? null : 'CPF inválido';
  }, [cpfRaw]);

  const parcelas = useMemo(
    () => calcularParcelas(product.currentPrice, MAX_INSTALLMENTS),
    [product.currentPrice]
  );

  const summary = useMemo((): IOrderSummaryDisplay => {
    const gross = product.currentPrice;
    if (paymentMethod === 'pix') {
      const s = getPixSummary(gross);
      const cardOption = parcelas[0];
      const savingsVsCard = cardOption ? cardOption.totalWithFee - gross : 0;
      return { ...s, savingsVsCard };
    }
    return getCardSummary(gross, parcelas, installments);
  }, [product.currentPrice, paymentMethod, parcelas, installments]);

  const handleCpfChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCpfRaw(maskCpf(e.target.value));
  }, []);

  const canSubmit = !!email && !emailError && stripCpf(cpfRaw).length === 11 && !cpfError;

  const handleSubmit = useCallback(
    async (e: React.FormEvent, onSuccess: () => void, submitFn?: () => Promise<void>) => {
      e.preventDefault();
      setSubmitError(null);
      if (!canSubmit) return;
      setIsSubmitting(true);
      try {
        if (submitFn) {
          await submitFn();
        } else {
          await new Promise((r) => setTimeout(r, 1500));
          if (email === MOCK_ERROR_EMAIL) {
            throw new Error('Erro ao processar. Tente novamente.');
          }
        }
        onSuccess();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao processar. Tente novamente.';
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [canSubmit]
  );

  const clearSubmitError = useCallback(() => setSubmitError(null), []);

  return {
    email,
    setEmail,
    cpfRaw,
    paymentMethod,
    setPaymentMethod,
    installments,
    setInstallments,
    emailError,
    cpfError,
    parcelas,
    summary,
    handleCpfChange,
    handleSubmit,
    canSubmit,
    isSubmitting,
    submitError,
    clearSubmitError,
  };
}
