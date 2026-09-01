"use client";

import { useEffect, useRef, useState } from "react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * 依元素在視窗中的位置，給它一個垂直位移。
 * speed 越大，滾動時「飄」得越明顯；可為負值往反方向。
 */
export function Parallax({ speed = 0.15, className = "", children, as: Tag = "div" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(-(mid * speed));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(0, ${offset.toFixed(1)}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * 整條橫幅：外框裁切，內層是一張比較高的圖，滾動時上下移動。
 */
export function ParallaxBand({ src, alt = "", height = "60vh", strength = 90, children }) {
  const wrap = useRef(null);
  const reduced = useReducedMotion();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (reduced) {
      setY(0);
      return;
    }
    const el = wrap.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        (window.innerHeight / 2 + rect.height / 2);
      setY(-progress * strength);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength, reduced]);

  return (
    <div
      ref={wrap}
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <img
        src={src}
        alt={alt}
        className="photo absolute inset-x-0 h-[135%] w-full object-cover"
        style={{ top: "-17.5%", transform: `translate3d(0, ${y.toFixed(1)}px, 0)` }}
      />
      <div className="absolute inset-0 bg-ink/25" />
      {children ? (
        <div className="relative z-10 flex h-full items-center">{children}</div>
      ) : null}
    </div>
  );
}
