"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { priceText } from "@/lib/products";

const PRIZES = [
  { code: "PG-A150", label: "折價券 NT$150", amount: 150, min: 1000 },
  { code: "PG-B250", label: "折價券 NT$250", amount: 250, min: 1800 },
  { code: "PG-C100", label: "折價券 NT$100", amount: 100, min: 800 },
];
const WIN_RATE = 0.1; // 十分之一
const KEY = "pg-draw-v1";
const today = () => new Date().toISOString().slice(0, 10);

export default function DrawPage() {
  const { applyCoupon, setOpen } = useCart();
  const [phase, setPhase] = useState("idle"); // idle | drawing | done
  const [record, setRecord] = useState(null); // { date, won, prize }

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem(KEY) || "null");
      if (r && r.date === today()) {
        setRecord(r);
        setPhase("done");
      }
    } catch {}
  }, []);

  const draw = () => {
    setPhase("drawing");
    window.setTimeout(() => {
      const won = Math.random() < WIN_RATE;
      const prize = won
        ? PRIZES[Math.floor(Math.random() * PRIZES.length)]
        : null;
      const r = { date: today(), won, prize };
      try {
        localStorage.setItem(KEY, JSON.stringify(r));
      } catch {}
      setRecord(r);
      if (won) applyCoupon(prize);
      setPhase("done");
    }, 1500);
  };

  const resetForDemo = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setRecord(null);
    setPhase("idle");
  };

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p className="eyebrow text-riso-red">每天一抽</p>
          <h1 className="mt-4 font-tc text-4xl font-black leading-tight md:text-6xl">
            抽個
            <br />
            折價券
          </h1>
          <p className="mt-6 max-w-sm text-[16px] leading-8 text-ink-soft">
            結帳前來試手氣。<span className="text-ink">十分之一</span>的機率會抽中一張折價券，
            抽中的話會自動放進你的籃子，下次結帳就折得到。
          </p>
          <ul className="rule mt-8 text-[14px] leading-7 text-ink-soft">
            <li className="rule py-2 first:border-t-0">一天可以抽一次</li>
            <li className="rule py-2">中獎率 10%，沒中明天再來</li>
            <li className="rule py-2">折價券金額 NT$100 – 250，各有低消門檻</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center border border-ink/25 bg-paper-deep p-8 md:p-12">
          {/* 印章 */}
          <div
            className={`flex h-40 w-40 items-center justify-center rounded-full border-[3px] border-riso-red text-riso-red transition-transform duration-700 ${
              phase === "drawing" ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "0.7s" }}
          >
            <span className="font-tc text-2xl font-black leading-tight text-center">
              {phase === "done" && record?.won
                ? "中"
                : phase === "done"
                  ? "謝謝"
                  : "抽"}
            </span>
          </div>

          <div className="mt-8 min-h-[120px] w-full text-center">
            {phase === "idle" && (
              <button
                onClick={draw}
                className="bg-ink px-8 py-3.5 font-tc text-[16px] text-paper transition-colors hover:bg-riso-red"
              >
                轉一下
              </button>
            )}

            {phase === "drawing" && (
              <p className="font-mono text-sm tracking-widest text-ink-soft">
                抽籤中⋯⋯
              </p>
            )}

            {phase === "done" && record?.won && (
              <div>
                <p className="font-tc text-2xl font-bold text-riso-red">
                  抽中了！{record.prize.label}
                </p>
                <p className="mt-2 font-mono text-[13px] text-ink-soft">
                  代碼 {record.prize.code}．滿 {priceText(record.prize.min)} 可用
                </p>
                <p className="mt-1 text-[13px] text-ink-soft">
                  已經放進你的籃子了
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="mt-4 border border-ink px-6 py-2.5 font-tc text-[14px] hover:bg-ink hover:text-paper"
                >
                  打開籃子看看
                </button>
              </div>
            )}

            {phase === "done" && !record?.won && (
              <div>
                <p className="font-tc text-xl font-bold">今天沒中，可惜</p>
                <p className="mt-2 text-[14px] text-ink-soft">
                  明天再來一次，機率一樣。
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-block border-b border-ink pb-0.5 font-tc text-[14px] hover:text-riso-red"
                >
                  先去逛貨架 →
                </Link>
              </div>
            )}
          </div>

          {phase === "done" && (
            <button
              onClick={resetForDemo}
              className="mt-6 font-mono text-[11px] tracking-wider text-ink-soft underline hover:text-riso-red"
            >
              重置今天的紀錄
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
