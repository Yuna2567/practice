import Link from "next/link";

export function Pagination({ current, total }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const href = (p) => (p === 1 ? "/shop" : `/shop?page=${p}`);

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-2"
      aria-label="分頁"
    >
      {current > 1 ? (
        <Link
          href={href(current - 1)}
          className="border border-ink/30 px-3 py-2 font-mono text-xs hover:bg-ink hover:text-paper"
        >
          ← 前一頁
        </Link>
      ) : (
        <span className="border border-ink/15 px-3 py-2 font-mono text-xs text-ink/30">
          ← 前一頁
        </span>
      )}

      <div className="flex items-center gap-1.5">
        {pages.map((p) => (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === current ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center font-mono text-sm ${
              p === current
                ? "bg-riso-red text-paper"
                : "border border-ink/25 hover:border-ink"
            }`}
          >
            {String(p).padStart(2, "0")}
          </Link>
        ))}
      </div>

      {current < total ? (
        <Link
          href={href(current + 1)}
          className="border border-ink/30 px-3 py-2 font-mono text-xs hover:bg-ink hover:text-paper"
        >
          下一頁 →
        </Link>
      ) : (
        <span className="border border-ink/15 px-3 py-2 font-mono text-xs text-ink/30">
          下一頁 →
        </span>
      )}
    </nav>
  );
}
