import Link from "next/link";
import { notFound } from "next/navigation";
import { Parallax } from "@/components/Parallax";
import { AddToCart } from "@/components/AddToCart";
import { products, getProduct, priceText } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.note,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const idx = products.findIndex((p) => p.slug === slug);
  const related = [products[(idx + 1) % products.length], products[(idx + 2) % products.length]];

  return (
    <article className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-16">
      <nav className="font-mono text-xs text-ink-soft">
        <Link href="/shop" className="hover:text-riso-red">
          選物
        </Link>
        <span className="px-2">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative">
          <Parallax speed={0.06}>
            <img
              src={product.image}
              alt={product.name}
              className="photo w-full border border-ink/25 object-cover"
            />
            <span className="tape left-6 top-[-14px] h-7 w-28 rotate-[-3deg]" />
          </Parallax>
          <p className="mt-3 font-mono text-[11px] text-ink-soft">
            {product.stock} · 現場可試用
          </p>
        </div>

        <div className="md:pt-6">
          <p className="eyebrow text-riso-red">{product.category}</p>
          <h1 className="mt-3 font-tc text-3xl font-bold leading-snug md:text-[40px]">
            {product.name}
          </h1>
          <p className="mt-2 text-[16px] text-ink-soft">{product.tagline}</p>

          <p className="mt-6 font-mono text-2xl">{priceText(product.price)}</p>

          <p className="mt-6 max-w-prose text-[16px] leading-8 text-ink-soft">
            {product.note}
          </p>

          <AddToCart
            product={{
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />

          <dl className="rule mt-10 pt-2">
            {product.specs.map(([k, v]) => (
              <div
                key={k}
                className="rule flex justify-between gap-6 py-3 text-[15px]"
              >
                <dt className="text-ink-soft">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[13px] leading-6 text-ink-soft">
            島內滿 NT$1,500 免運，未滿酌收 NT$80。手工品有些微色差與痕跡，
            那是正常的，不影響使用。
          </p>
        </div>
      </div>

      <section className="mt-24">
        <p className="eyebrow text-ink-soft">看看旁邊這幾樣</p>
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group flex gap-4 border border-ink/20 bg-paper-deep p-3"
            >
              <img
                src={p.image}
                alt={p.name}
                className="photo h-24 w-24 shrink-0 object-cover"
              />
              <div className="min-w-0">
                <h3 className="font-tc text-[16px] font-medium group-hover:text-riso-red">
                  {p.name}
                </h3>
                <p className="mt-1 truncate text-[13px] text-ink-soft">{p.tagline}</p>
                <p className="mt-2 font-mono text-sm">{priceText(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link
        href="/shop"
        className="mt-16 inline-block border-b border-ink pb-0.5 font-tc text-[15px] hover:text-riso-red"
      >
        ← 回貨架
      </Link>
    </article>
  );
}
