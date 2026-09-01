import Link from "next/link";
import { Parallax, ParallaxBand } from "@/components/Parallax";

export const metadata = {
  title: "關於",
  description: "紙貨行是誰開的、開在哪、為什麼只賣這些東西。",
};

const timeline = [
  ["2016", "在赤峰街租下二樓，本來只想放自己的收藏，後來乾脆賣。"],
  ["2018", "開始跟台灣小廠合作調墨水，第一支是『夜讀藍』。"],
  ["2021", "把樓梯間改成試寫桌，客人可以坐下來寫半小時再決定。"],
  ["2024", "內冊、筆尖這類補充品開放線上補貨，其他還是想請你來一趟。"],
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Parallax
          speed={-0.1}
          className="pointer-events-none absolute -left-10 top-16 hidden w-[30vw] max-w-sm md:block"
        >
          <img src="/img/journal10.jpg" alt="" className="photo w-full border border-ink/20" />
        </Parallax>
        <Parallax
          speed={0.16}
          className="pointer-events-none absolute -right-6 top-40 hidden w-[22vw] max-w-[240px] md:block"
        >
          <img src="/img/stamp16.jpg" alt="" className="photo w-full border border-ink/20" />
        </Parallax>

        <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
          <p className="eyebrow text-riso-red">關於這間店</p>
          <h1 className="mt-5 max-w-[16ch] font-tc text-4xl font-black leading-tight md:text-6xl">
            一間開在二樓、
            <br />
            不太好找的文具店
          </h1>
          <p className="mt-7 max-w-lg text-[16px] leading-8 text-ink-soft">
            招牌很小，Google 地圖上的照片還是三年前的。上樓推開門會先聞到紙味，
            然後是咖啡。店裡通常只有一到兩個人顧，慢慢看沒關係。
          </p>
        </div>
      </section>

      <ParallaxBand src="/img/desk17.jpg" alt="店裡的工作桌" height="58vh">
        <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8">
          <p className="max-w-xl font-tc text-2xl leading-relaxed text-paper md:text-3xl">
            我們相信，挑文具跟挑鍋子一樣——
            買對一次，可以用很久很久。
          </p>
        </div>
      </ParallaxBand>

      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="eyebrow text-ink-soft">走過的路</p>
            <h2 className="mt-4 font-tc text-3xl font-bold">一路上</h2>
          </div>
          <ul className="rule">
            {timeline.map(([year, text]) => (
              <li key={year} className="rule flex gap-6 py-6 first:border-t-0">
                <span className="font-mono text-sm text-riso-red">{year}</span>
                <p className="text-[16px] leading-8 text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-24 md:px-8">
        <div className="grid gap-8 border border-ink/25 bg-paper-deep p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow text-ink-soft">來一趟</p>
            <p className="mt-3 font-tc text-2xl leading-relaxed">
              台北市大同區
              <br />
              赤峰街 3 巷 2 號 2F
            </p>
          </div>
          <div className="font-tc text-[16px] leading-8">
            <p>週三 – 週日　13:00 – 20:00</p>
            <p className="text-ink-soft">週一、週二 休息</p>
            <p className="mt-4">
              捷運中山站 4 號出口，往南京西路方向走三分鐘，看到賣蔥油餅的轉進巷子。
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-ink px-6 py-3 text-[15px] text-paper hover:bg-riso-red"
            >
              先看看架上有什麼 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
