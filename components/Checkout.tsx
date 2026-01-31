"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import type { IProduct } from "@/lib/types";
import type { IPaymentMethod } from "@/lib/types";
import { formatBRL } from "@/lib/format";
import { ProductCard } from "@/components/ProductCard";
import { OrderSummary } from "@/components/OrderSummary";
import { SuccessDialog } from "@/components/SuccessDialog";
import { useCheckoutForm } from "@/hooks/useCheckoutForm";

interface CheckoutProps {
  product: IProduct;
}

export function Checkout({ product }: CheckoutProps) {
  const [successOpen, setSuccessOpen] = useState(false);
  const {
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
  } = useCheckoutForm(product);

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, () => setSuccessOpen(true));
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 space-y-6">
      <ProductCard product={product} />

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Dados pessoais
          </h3>
          <div className="space-y-4">
            <TextField
              fullWidth
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              required
              autoComplete="email"
              size="small"
            />
            <TextField
              fullWidth
              label="CPF"
              value={cpfRaw}
              onChange={handleCpfChange}
              error={!!cpfError}
              helperText={cpfError}
              placeholder="000.000.000-00"
              inputProps={{ maxLength: 14 }}
              size="small"
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className="text-base font-medium text-gray-900 mb-2">
              Pagamento
            </FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as IPaymentMethod)
              }
            >
              <FormControlLabel
                value="pix"
                control={<Radio size="small" sx={{ py: 0 }} />}
                label={
                  <span className="flex items-center gap-1">
                    PIX (Taxa 0%{" "}
                    <span className="text-amber-600 font-medium" aria-hidden>🔥</span>)
                  </span>
                }
                className="rounded border-2 border-green-400 bg-green-50/50 pt-2 pr-2 pb-2 pl-0 mb-2"
                sx={{ alignItems: "center" }}
              />
              <FormControlLabel
                value="card"
                control={<Radio size="small" sx={{ py: 0 }} />}
                label="Cartão"
                sx={{ alignItems: "center" }}
              />
            </RadioGroup>
            {paymentMethod === "card" && (
              <div className="mt-3 pl-6">
                <FormLabel className="text-sm text-gray-600">
                  Parcelas
                </FormLabel>
                <Select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  size="small"
                  fullWidth
                  sx={{ mt: 0.5 }}
                >
                  {parcelas.map((p) => (
                    <MenuItem key={p.installments} value={p.installments}>
                      {p.installments}x {formatBRL(p.installmentValue)} (
                      {formatBRL(p.totalWithFee)} total)
                    </MenuItem>
                  ))}
                </Select>
                {summary.platformFee > 0 && (
                  <FormHelperText className="text-green-600 mt-1">
                    Você economizaria {formatBRL(summary.platformFee)} com PIX
                  </FormHelperText>
                )}
              </div>
            )}
          </FormControl>
        </section>

        <OrderSummary summary={summary} producerName={product.producer} />

        {submitError && (
          <Alert severity="error" onClose={clearSubmitError}>
            {submitError}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!canSubmit || isSubmitting}
          className="min-h-[48px]"
        >
          {isSubmitting ? "Processando…" : "Finalizar Compra 🚀"}
        </Button>
      </form>

      <SuccessDialog open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
}
