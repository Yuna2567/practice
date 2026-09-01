import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1180px] flex-col items-start px-5 py-32 md:px-8">
      <p className="eyebrow text-riso-red">404</p>
      <h1 className="mt-4 font-tc text-4xl font-black md:text-5xl">這一頁不在架上</h1>
      <p className="mt-4 max-w-sm text-[16px] leading-8 text-ink-soft">
        可能是連結舊了，或那樣東西賣完下架了。回貨架看看還有什麼吧。
      </p>
      <Link
        href="/shop"
        className="mt-8 bg-ink px-6 py-3 font-tc text-[15px] text-paper hover:bg-riso-red"
      >
        回貨架 →
      </Link>
    </section>
  );
}
