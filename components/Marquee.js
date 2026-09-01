"use client";

export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink/20 bg-riso-red text-paper">
      <div className="marquee-track flex w-max whitespace-nowrap py-2">
        {row.map((t, i) => (
          <span
            key={i}
            className="eyebrow flex items-center gap-4 px-6"
            aria-hidden={i >= items.length}
          >
            {t}
            <span className="opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
