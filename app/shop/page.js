import Link from "next/link";
import { Parallax } from "@/components/Parallax";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { getPage, PER_PAGE } from "@/lib/products";

export const metadata = {
  title: "選物",
  description: "紙貨行架上的全部文具，一頁六樣，慢慢看。",
};

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const page = Number.parseInt(raw ?? "1", 10);
  const { current, total, items, count } = getPage(page);

  const from = (current - 1) * PER_PAGE + 1;
  const to = Math.min(current * PER_PAGE, count);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/20">
        <Parallax
          speed={-0.14}
          className="pointer-events-none absolute -right-16 -top-8 hidden w-[34vw] max-w-md opacity-90 md:block"
        >
          <img src="/img/ruler6.jpg" alt="" className="photo w-full border border-ink/20" />
        </Parallax>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow text-riso-red">全部選物</p>
          <h1 className="mt-4 font-tc text-4xl font-black md:text-6xl">貨架</h1>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-ink-soft">
            一共 {count} 樣，一頁放六樣。沒有排行、沒有「熱銷」標籤，
            就照我們擺上架的順序。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16">
        <div className="rule flex items-center justify-between pb-3 font-mono text-xs text-ink-soft">
          <span>
            第 {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")} 頁
          </span>
          <span>
            {String(from).padStart(2, "0")} – {String(to).padStart(2, "0")} 樣
          </span>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>

        <Pagination current={current} total={total} />

        <p className="mt-14 text-center font-tc text-[15px] text-ink-soft">
          想看實品？
          <Link href="/about" className="border-b border-ink hover:text-riso-red">
            來店裡走一趟
          </Link>
          。
        </p>
      </section>
    </>
  );
}
