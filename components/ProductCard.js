import Link from "next/link";
import { priceText } from "@/lib/products";
import { QuickAdd } from "@/components/QuickAdd";

export function ProductCard({ product, index = 0 }) {
  const tilt = index % 2 === 0 ? "sm:-rotate-[0.6deg]" : "sm:rotate-[0.6deg]";
  const mini = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return (
    <div className={`group ${tilt} transition-transform duration-300 hover:rotate-0`}>
      <div className="relative overflow-hidden border border-ink/20 bg-paper-deep">
        <span className="tape left-4 top-[-10px] h-5 w-16 rotate-[-4deg]" />
        <Link href={`/shop/${product.slug}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="photo aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <span className="pointer-events-none absolute right-0 top-0 bg-ink px-2 py-1 font-mono text-[10px] tracking-widest text-paper">
          {product.category}
        </span>
        <QuickAdd product={mini} />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-tc text-[17px] font-medium leading-snug hover:text-riso-red">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 text-[13px] text-ink-soft">{product.tagline}</p>
        </div>
        <span className="whitespace-nowrap font-mono text-sm">
          {priceText(product.price)}
        </span>
      </div>
    </div>
  );
}
