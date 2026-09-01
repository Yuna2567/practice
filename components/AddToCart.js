"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function AddToCart({ product }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center border border-ink/40">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-3 text-sm hover:bg-ink hover:text-paper"
            aria-label="減一"
          >
            −
          </button>
          <span className="w-10 text-center font-mono">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="px-3.5 py-3 text-sm hover:bg-ink hover:text-paper"
            aria-label="加一"
          >
            ＋
          </button>
        </div>

        <button
          type="button"
          onClick={() => add(product, qty)}
          className="bg-ink px-7 py-3 font-tc text-[15px] text-paper transition-colors hover:bg-riso-red"
        >
          放進籃子
        </button>
        <button
          type="button"
          onClick={() => {
            add(product, qty);
            setOpen(true);
          }}
          className="border border-ink px-7 py-3 font-tc text-[15px] hover:bg-ink hover:text-paper"
        >
          直接結帳
        </button>
      </div>
    </div>
  );
}
