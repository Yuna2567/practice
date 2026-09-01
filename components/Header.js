"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";

const NAV = [
  ["首頁", "/"],
  ["選物", "/shop"],
  ["抽獎", "/draw"],
  ["遊戲", "/game"],
  ["誌", "/journal"],
  ["關於", "/about"],
  ["聯絡", "/contact"],
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen, ready } = useCart();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/20 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3.5 md:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-tc text-xl font-bold tracking-tight md:text-2xl">
            紙貨行
          </span>
          <span className="eyebrow hidden text-ink-soft group-hover:text-riso-red sm:inline">
            Paper Goods
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`font-tc text-[15px] transition-colors hover:text-riso-red ${
                isActive(href)
                  ? "text-riso-red underline decoration-riso-red decoration-1 underline-offset-[6px]"
                  : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="eyebrow flex items-center gap-1.5 border border-ink/40 px-2.5 py-1 text-ink-soft transition-colors hover:border-riso-red hover:text-riso-red"
          >
            籃子{" "}
            <span className="text-ink">
              {ready ? String(count).padStart(2, "0") : "00"}
            </span>
          </button>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="eyebrow border border-ink/40 px-2 py-1 text-ink-soft"
          >
            籃 {ready ? String(count).padStart(2, "0") : "00"}
          </button>
          <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
          aria-label="選單"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-ink transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-ink/15 bg-paper px-5 py-3 lg:hidden">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`block border-b border-ink/10 py-3 font-tc text-lg last:border-0 ${
                isActive(href) ? "text-riso-red" : "text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
