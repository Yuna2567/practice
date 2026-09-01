import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/25 bg-paper-deep">
      <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-tc text-2xl font-bold">紙貨行</p>
            <p className="mt-3 max-w-xs text-[15px] leading-7 text-ink-soft">
              一間只賣自己會用的文具的小店。開在巷子裡，二樓，
              門口那盆黃金葛長得比招牌還高。
            </p>
          </div>

          <div className="text-[15px] leading-8">
            <p className="eyebrow mb-2 text-ink-soft">逛逛</p>
            <Link href="/shop" className="block hover:text-riso-red">
              全部選物
            </Link>
            <Link href="/about" className="block hover:text-riso-red">
              關於這間店
            </Link>
            <Link href="/journal" className="block hover:text-riso-red">
              紙貨行．誌
            </Link>
            <Link href="/draw" className="block hover:text-riso-red">
              每天一抽
            </Link>
            <Link href="/game" className="block hover:text-riso-red">
              翻翻配對小遊戲
            </Link>
            <Link href="/contact" className="block hover:text-riso-red">
              聯絡我們
            </Link>
          </div>

          <div className="text-[15px] leading-8">
            <p className="eyebrow mb-2 text-ink-soft">走一趟</p>
            <p>台北市大同區赤峰街 3 巷 2 號 2F</p>
            <p>週三至週日 13:00 – 20:00</p>
            <p className="text-ink-soft">週一週二把貨、寫字、休息</p>
          </div>
        </div>

        <div className="rule mt-12 flex flex-col gap-2 pt-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono">© {new Date().getFullYear()} 紙貨行 PAPER GOODS</span>
          <span className="font-mono">商品圖片來自 loremflickr.com</span>
        </div>
      </div>
    </footer>
  );
}
