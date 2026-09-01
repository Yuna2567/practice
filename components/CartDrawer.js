"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart, FREE_SHIPPING } from "@/components/CartProvider";
import { priceText } from "@/lib/products";

export function CartDrawer() {
  const cart = useCart();
  const {
    open,
    setOpen,
    items,
    subtotal,
    shipping,
    discount,
    total,
    coupon,
    couponEligible,
    removeCoupon,
    setQty,
    remove,
    checkout,
    lastOrder,
  } = cart;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const awayFromFreeShip = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[100] bg-ink/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[101] flex h-full w-full max-w-[420px] flex-col border-l border-ink/25 bg-paper transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="購物籃"
      >
        <div className="flex items-center justify-between border-b border-ink/20 px-5 py-4">
          <p className="font-tc text-lg font-bold">
            籃子{" "}
            <span className="font-mono text-sm text-ink-soft">
              （{items.reduce((n, x) => n + x.qty, 0)}）
            </span>
          </p>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-xs tracking-widest hover:text-riso-red"
          >
            關閉 ✕
          </button>
        </div>

        {lastOrder && items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-3 px-6">
            <p className="eyebrow text-riso-red">訂單成立</p>
            <p className="font-tc text-2xl font-bold">謝謝你，收到了！</p>
            <p className="text-[15px] leading-7 text-ink-soft">
              訂單編號{" "}
              <span className="font-mono text-ink">{lastOrder}</span>
              。我們會寄一封確認信到你的信箱，出貨後再給你一次追蹤碼。
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 bg-ink px-5 py-2.5 text-[14px] text-paper hover:bg-riso-red"
            >
              繼續逛
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-3 px-6">
            <p className="font-tc text-xl">籃子還是空的</p>
            <p className="text-[15px] text-ink-soft">挑一樣喜歡的放進來吧。</p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-2 bg-ink px-5 py-2.5 text-[14px] text-paper hover:bg-riso-red"
            >
              去貨架 →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {subtotal < FREE_SHIPPING ? (
                <p className="mb-4 border border-ink/20 bg-paper-deep px-3 py-2 text-[13px] text-ink-soft">
                  再買 {priceText(awayFromFreeShip)} 就免運
                </p>
              ) : (
                <p className="mb-4 border border-sage/40 bg-sage/10 px-3 py-2 text-[13px] text-ink-soft">
                  已達免運 ✓
                </p>
              )}

              <ul className="divide-y divide-ink/12">
                {items.map((it) => (
                  <li key={it.slug} className="flex gap-3 py-4">
                    <img
                      src={it.image}
                      alt=""
                      className="photo h-20 w-20 shrink-0 border border-ink/20 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/shop/${it.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-tc text-[15px] font-medium hover:text-riso-red"
                      >
                        {it.name}
                      </Link>
                      <p className="mt-0.5 font-mono text-[13px] text-ink-soft">
                        {priceText(it.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-ink/30">
                          <button
                            onClick={() => setQty(it.slug, it.qty - 1)}
                            className="px-2.5 py-1 text-sm hover:bg-ink hover:text-paper"
                            aria-label="減一"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-mono text-sm">
                            {it.qty}
                          </span>
                          <button
                            onClick={() => setQty(it.slug, it.qty + 1)}
                            className="px-2.5 py-1 text-sm hover:bg-ink hover:text-paper"
                            aria-label="加一"
                          >
                            ＋
                          </button>
                        </div>
                        <button
                          onClick={() => remove(it.slug)}
                          className="font-mono text-[11px] tracking-wider text-ink-soft hover:text-riso-red"
                        >
                          移除
                        </button>
                      </div>
                    </div>
                    <span className="whitespace-nowrap font-mono text-[13px]">
                      {priceText(it.price * it.qty)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/20 px-5 py-4">
              <dl className="space-y-1.5 font-mono text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">小計</dt>
                  <dd>{priceText(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">運費</dt>
                  <dd>{shipping === 0 ? "免運" : priceText(shipping)}</dd>
                </div>
                {coupon ? (
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">
                      {coupon.label}
                      {!couponEligible ? (
                        <span className="text-riso-red">
                          （滿 {priceText(coupon.min)} 可用）
                        </span>
                      ) : null}
                      <button
                        onClick={removeCoupon}
                        className="ml-2 text-[11px] underline hover:text-riso-red"
                      >
                        拿掉
                      </button>
                    </dt>
                    <dd className="text-riso-red">
                      {discount
                        ? "−" + priceText(discount)
                        : couponEligible && coupon.freeShipping
                          ? "免運"
                          : "—"}
                    </dd>
                  </div>
                ) : (
                  <div className="flex justify-between text-ink-soft">
                    <dt>折價券</dt>
                    <dd>
                      <Link
                        href="/draw"
                        onClick={() => setOpen(false)}
                        className="underline hover:text-riso-red"
                      >
                        去抽一張
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-3 flex items-baseline justify-between border-t border-ink/20 pt-3">
                <span className="font-tc text-base font-bold">應付</span>
                <span className="font-mono text-lg">{priceText(total)}</span>
              </div>

              <button
                onClick={() => checkout()}
                className="mt-4 w-full bg-ink py-3 font-tc text-[15px] text-paper transition-colors hover:bg-riso-red"
              >
                結帳
              </button>
              <p className="mt-2 text-center text-[11px] text-ink-soft">
                結帳後會寄一封確認信到你的信箱
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
