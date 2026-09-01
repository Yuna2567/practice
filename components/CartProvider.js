"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const STORE_KEY = "pg-cart-v1";
export const FREE_SHIPPING = 1500;
export const FLAT_SHIPPING = 80;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // 讀回上次的籃子
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      if (Array.isArray(saved.items)) setItems(saved.items);
      if (saved.coupon) setCoupon(saved.coupon);
    } catch {}
    setReady(true);
  }, []);

  // 存起來
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ items, coupon }));
    } catch {}
  }, [items, coupon, ready]);

  // 抽屜打開時鎖住背景捲動
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === product.slug);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    setLastOrder(null);
    setOpen(true);
  }, []);

  const setQty = useCallback((slug, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => x.slug !== slug)
        : prev.map((x) => (x.slug === slug ? { ...x, qty } : x))
    );
  }, []);

  const remove = useCallback(
    (slug) => setItems((prev) => prev.filter((x) => x.slug !== slug)),
    []
  );

  const clear = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((c) => setCoupon(c), []);
  const removeCoupon = useCallback(() => setCoupon(null), []);

  const checkout = useCallback(() => {
    const id = "PG" + Date.now().toString(36).toUpperCase().slice(-6);
    setLastOrder(id);
    setItems([]);
    setCoupon(null);
    return id;
  }, []);

  const derived = useMemo(() => {
    const count = items.reduce((n, x) => n + x.qty, 0);
    const subtotal = items.reduce((n, x) => n + x.qty * x.price, 0);
    const couponEligible = !!coupon && subtotal >= (coupon?.min ?? 0);
    const freeByCoupon = couponEligible && !!coupon.freeShipping;
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING || freeByCoupon
        ? 0
        : FLAT_SHIPPING;
    const discount = couponEligible ? coupon.amount ?? 0 : 0;
    const total = Math.max(0, subtotal + shipping - discount);
    return { count, subtotal, shipping, discount, total, couponEligible };
  }, [items, coupon]);

  const value = {
    ready,
    items,
    coupon,
    open,
    lastOrder,
    setOpen,
    add,
    setQty,
    remove,
    clear,
    applyCoupon,
    removeCoupon,
    checkout,
    ...derived,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart 必須在 <CartProvider> 裡使用");
  return ctx;
}
