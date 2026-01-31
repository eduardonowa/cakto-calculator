import { memo } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import type { IOrderSummaryDisplay } from "@/lib/types";
import { formatBRL } from "@/lib/format";

interface OrderSummaryProps {
  summary: IOrderSummaryDisplay;
  producerName: string;
}

function OrderSummaryInner({ summary, producerName }: OrderSummaryProps) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h3 className="text-base font-medium text-gray-900 mb-3">
        Resumo do pedido
      </h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Produto</span>
          <span>{formatBRL(summary.grossValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxa Cakto</span>
          <span>{formatBRL(summary.platformFee)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-gray-900">Total</span>
          <span>{formatBRL(summary.total)}</span>
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="flex justify-between font-medium text-green-700">
          <span>{producerName} recebe</span>
          <span>{formatBRL(summary.producerReceives)}</span>
        </div>
        {"savingsVsCard" in summary &&
          summary.savingsVsCard != null &&
          summary.savingsVsCard > 0 && (
            <FormHelperText className="text-green-600 mt-1">
              Você economiza {formatBRL(summary.savingsVsCard)} com PIX
            </FormHelperText>
          )}
      </div>
    </section>
  );
}

export const OrderSummary = memo(OrderSummaryInner);
