"use client";

import { useCart } from "@/components/CartProvider";

export function QuickAdd({ product }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        add(product, 1);
      }}
      className="absolute bottom-2 right-2 z-10 bg-paper/95 px-3 py-1.5 font-mono text-[11px] tracking-wider text-ink opacity-0 shadow-sm transition-opacity hover:bg-riso-red hover:text-paper focus-visible:opacity-100 group-hover:opacity-100"
    >
      ＋ 放入籃子
    </button>
  );
}
