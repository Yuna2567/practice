"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { products, priceText } from "@/lib/products";

const KEY = "pg-game-v1";
const PAIRS = 8;
const today = () => new Date().toISOString().slice(0, 10);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck() {
  const picks = shuffle(products).slice(0, PAIRS);
  return shuffle(
    picks.flatMap((p, i) => [
      { id: `${i}-a`, key: p.slug, name: p.name, image: p.image },
      { id: `${i}-b`, key: p.slug, name: p.name, image: p.image },
    ])
  );
}

// 步數越少，獎越好
function rewardFor(moves) {
  if (moves <= 10)
    return {
      code: "GAME-S",
      label: "折價券 NT$200",
      amount: 200,
      min: 1500,
      tier: "手氣爆棚",
    };
  if (moves <= 16)
    return {
      code: "GAME-A",
      label: "折價券 NT$120",
      amount: 120,
      min: 1000,
      tier: "記性不錯",
    };
  return {
    code: "GAME-B",
    label: "免運券一張",
    amount: 0,
    min: 600,
    freeShipping: true,
    tier: "有玩就有獎",
  };
}

export default function GamePage() {
  const { applyCoupon, setOpen } = useCart();
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]); // index in deck
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [awardedToday, setAwardedToday] = useState(null); // reward object
  const [justAwarded, setJustAwarded] = useState(false);

  const start = useCallback(() => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLock(false);
    setJustAwarded(false);
  }, []);

  useEffect(() => {
    start();
    try {
      const r = JSON.parse(localStorage.getItem(KEY) || "null");
      if (r && r.date === today()) setAwardedToday(r.reward);
    } catch {}
  }, [start]);

  const done = deck.length > 0 && matched.size === PAIRS;

  // 翻牌配對判定
  useEffect(() => {
    if (flipped.length !== 2) return;
    setLock(true);
    const [i, j] = flipped;
    const hit = deck[i]?.key === deck[j]?.key;
    const t = setTimeout(() => {
      if (hit) {
        setMatched((prev) => new Set(prev).add(deck[i].key));
      }
      setFlipped([]);
      setLock(false);
    }, hit ? 360 : 760);
    return () => clearTimeout(t);
  }, [flipped, deck]);

  // 完成 → 依步數給獎（每天第一次完成才發）
  useEffect(() => {
    if (!done) return;
    const reward = rewardFor(moves);
    let already = null;
    try {
      const r = JSON.parse(localStorage.getItem(KEY) || "null");
      if (r && r.date === today()) already = r.reward;
    } catch {}
    if (!already) {
      try {
        localStorage.setItem(
          KEY,
          JSON.stringify({ date: today(), reward, moves })
        );
      } catch {}
      applyCoupon(reward);
      setAwardedToday(reward);
      setJustAwarded(true);
    }
  }, [done, moves, applyCoupon]);

  const click = (idx) => {
    if (lock || flipped.includes(idx) || matched.has(deck[idx].key)) return;
    if (flipped.length === 0) {
      setFlipped([idx]);
    } else if (flipped.length === 1) {
      setFlipped([flipped[0], idx]);
      setMoves((m) => m + 1);
    }
  };

  const result = done ? rewardFor(moves) : null;

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
        {/* 說明 / 結果 */}
        <div>
          <p className="eyebrow text-riso-red">動動腦小遊戲</p>
          <h1 className="mt-4 font-tc text-4xl font-black leading-tight md:text-5xl">
            文具
            <br />
            翻翻配對
          </h1>
          <p className="mt-6 max-w-sm text-[16px] leading-8 text-ink-soft">
            八組貨架上的文具，翻開找出成對的。
            <span className="text-ink">步數越少、獎越好</span>——
            全部配對完成就把折價券放進你的籃子。
          </p>

          <ul className="rule mt-8 font-mono text-[13px] leading-7 text-ink-soft">
            <li className="rule flex justify-between py-2 first:border-t-0">
              <span>10 步以內</span>
              <span className="text-ink">折價券 NT$200</span>
            </li>
            <li className="rule flex justify-between py-2">
              <span>16 步以內</span>
              <span className="text-ink">折價券 NT$120</span>
            </li>
            <li className="rule flex justify-between py-2">
              <span>完成即可</span>
              <span className="text-ink">免運券一張</span>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-6 font-mono text-sm">
            <span>
              步數 <span className="text-lg">{String(moves).padStart(2, "0")}</span>
            </span>
            <span>
              配對 {matched.size} / {PAIRS}
            </span>
          </div>

          {done && (
            <div className="mt-6 border border-ink/25 bg-paper-deep p-6">
              <p className="eyebrow text-riso-red">{result.tier}</p>
              <p className="mt-2 font-tc text-2xl font-bold">
                {moves} 步完成，拿到{result.label}
              </p>
              <p className="mt-1 font-mono text-[13px] text-ink-soft">
                代碼 {result.code}．
                {result.freeShipping
                  ? `滿 ${priceText(result.min)} 免運`
                  : `滿 ${priceText(result.min)} 可用`}
              </p>
              {justAwarded ? (
                <p className="mt-2 text-[13px] text-ink-soft">已放進你的籃子</p>
              ) : (
                <p className="mt-2 text-[13px] text-ink-soft">
                  今天已經領過「{awardedToday?.label}」了，明天再來拿新的。
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="border border-ink px-5 py-2.5 font-tc text-[14px] hover:bg-ink hover:text-paper"
                >
                  打開籃子
                </button>
                <button
                  onClick={start}
                  className="bg-ink px-5 py-2.5 font-tc text-[14px] text-paper hover:bg-riso-red"
                >
                  再玩一次
                </button>
              </div>
            </div>
          )}

          {!done && (
            <button
              onClick={start}
              className="mt-8 border-b border-ink pb-0.5 font-tc text-[14px] text-ink-soft hover:text-riso-red"
            >
              重新洗牌
            </button>
          )}
        </div>

        {/* 牌桌 */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {deck.map((card, idx) => {
            const isUp =
              flipped.includes(idx) || matched.has(card.key) || done;
            return (
              <button
                key={card.id}
                onClick={() => click(idx)}
                aria-label={isUp ? card.name : "蓋著的牌"}
                className="relative block aspect-square w-full"
                style={{ perspective: "800px" }}
              >
                <span
                  className="absolute inset-0 transition-transform duration-300"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isUp ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* 背面 */}
                  <span
                    className="absolute inset-0 flex items-center justify-center border border-ink/30 bg-ink text-paper [backface-visibility:hidden]"
                  >
                    <span className="font-tc text-lg font-black opacity-70">紙</span>
                  </span>
                  {/* 正面 */}
                  <span
                    className={`absolute inset-0 overflow-hidden border [backface-visibility:hidden] ${
                      matched.has(card.key)
                        ? "border-riso-red"
                        : "border-ink/30"
                    }`}
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <img
                      src={card.image}
                      alt=""
                      className="photo h-full w-full object-cover"
                    />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-12 text-center font-tc text-[14px] text-ink-soft">
        想試手氣不用動腦的話，
        <Link href="/draw" className="border-b border-ink hover:text-riso-red">
          去每天一抽
        </Link>
        。
      </p>
    </section>
  );
}
