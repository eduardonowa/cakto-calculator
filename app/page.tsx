import { Checkout } from "@/components/Checkout";
import { MOCK_PRODUCT } from "@/lib/product";

export default function Home() {
  return (
    <main className="min-h-screen py-6 sm:py-8">
      <Checkout product={MOCK_PRODUCT} />
    </main>
  );
}
