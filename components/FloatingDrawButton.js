"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingDrawButton() {
  const [show, setShow] = useState(false);

  // 稍微捲一點再淡入，才不會擋到 hero
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/draw"
      aria-label="去抽折價券"
      className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-ink bg-riso-red px-4 py-3 text-paper shadow-[3px_3px_0_rgba(33,28,21,0.35)] transition-all duration-300 hover:bg-ink md:bottom-8 md:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-paper/70 font-tc text-sm font-black">
        抽
      </span>
      <span className="font-tc text-[14px] leading-tight">
        每天一抽
        <br />
        <span className="font-mono text-[10px] tracking-wider opacity-80">
          10% 中折價券
        </span>
      </span>
    </Link>
  );
}
