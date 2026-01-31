import type { IProduct } from "@/lib/types";
import { formatBRL } from "@/lib/format";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {product.name}
      </h2>
      <p className="text-sm text-gray-500">
        De {formatBRL(product.originalPrice)} por{" "}
        <span className="font-semibold text-gray-900">
          {formatBRL(product.currentPrice)}
        </span>
      </p>
    </section>
  );
}
