import Link from "next/link";
import { Parallax, ParallaxBand } from "@/components/Parallax";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { FloatingDrawButton } from "@/components/FloatingDrawButton";
import { products } from "@/lib/products";

const featured = ["brass-fountain-pen", "thread-bound-notebook", "glass-bottled-ink"]
  .map((s) => products.find((p) => p.slug === s));

const categories = [
  ["筆", "鋼筆、簽字筆、色鉛筆、沾水筆"],
  ["紙品", "筆記本、手帳、信紙、便條"],
  ["桌上", "尺、剪刀、削鉛筆機、桌墊"],
  ["貼物", "和紙膠帶、便利貼、封口貼紙"],
  ["印章", "現貨圖樣、留字客製"],
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Parallax
          speed={-0.12}
          className="pointer-events-none absolute -right-24 top-10 hidden w-[42vw] max-w-xl md:block"
        >
          <img
            src="/img/desk17.jpg"
            alt=""
            className="photo w-full border border-ink/20 object-cover"
          />
        </Parallax>

        <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <p className="eyebrow text-riso-red">赤峰街 · 二樓 · 自 2016</p>
          <h1 className="mt-5 max-w-[14ch] font-tc text-[13vw] font-black leading-[0.95] tracking-tight md:text-[92px]">
            只賣自己
            <br />
            會用的文具
          </h1>
          <div className="mt-7 max-w-md text-[16px] leading-8 text-ink-soft">
            <p>
              我們不追新款、也不做開架的量。每一支筆、每一疊紙，都是老闆娘先用過一輪，
              覺得「這個好，想介紹給別人」才會擺上架。
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="bg-ink px-6 py-3 font-tc text-[15px] text-paper transition-colors hover:bg-riso-red"
            >
              去逛貨架 →
            </Link>
            <Link
              href="/about"
              className="border-b border-ink pb-0.5 font-tc text-[15px] hover:border-riso-red hover:text-riso-red"
            >
              為什麼開這間店
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <Parallax speed={0.08} className="relative z-10">
            <img
              src="/img/pen1.jpg"
              alt="攤在桌上的鋼筆與筆記本"
              className="photo aspect-[16/9] w-full border border-ink/25 object-cover"
            />
            <span className="tape left-6 top-[-14px] h-7 w-28 rotate-[-3deg]" />
            <span className="tape right-10 bottom-[-12px] h-6 w-24 rotate-[2deg]" />
          </Parallax>
          <Parallax
            speed={0.28}
            className="absolute -bottom-10 right-6 z-20 w-40 md:right-16 md:w-52"
          >
            <img
              src="/img/washi4.jpg"
              alt=""
              className="photo w-full border border-ink/25 object-cover shadow-[6px_6px_0_rgba(33,28,21,0.18)]"
            />
          </Parallax>
        </div>
      </section>

      <div className="mt-16">
        <Marquee
          items={[
            "本週新到 · 夜讀藍鋼筆墨水",
            "滿 NT$1500 島內免運",
            "現場可試寫任何一支筆",
            "手帳內冊補貨中",
            "週三到週日 開門",
          ]}
        />
      </div>

      {/* ── 開店的理由 ───────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="eyebrow text-ink-soft">01 — 我們在意的事</p>
            <h2 className="mt-4 font-tc text-3xl font-bold leading-snug md:text-[40px]">
              一支筆握十年，
              <br />
              比一次買十支更划算
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-8 text-ink-soft">
            <p>
              文具是消耗品，但好的文具是耐久財。黃銅會長手澤、皮革會變色、
              鋼筆的筆尖會慢慢磨成你握筆的角度——這些都要時間，急不得。
            </p>
            <p>
              所以我們寧可貨架空一點。上架前會問自己三個問題：自己會不會用、
              壞了修不修得好、十年後看它會不會後悔。三個都過了才進貨。
            </p>
            <p className="font-tc text-ink">
              — 如果你也是那種會為了一條線的粗細猶豫很久的人，這間店是為你開的。
            </p>
          </div>
        </div>
      </section>

      {/* ── 視差橫幅 1（背景固定）─────────────── */}
      <section
        className="band-fixed relative flex min-h-[70vh] items-center"
        style={{ backgroundImage: "url(/img/calli15.jpg)" }}
      >
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative mx-auto w-full max-w-[1180px] px-5 md:px-8">
          <p className="max-w-2xl font-tc text-2xl leading-relaxed text-paper md:text-[34px]">
            「寫字這件事，工具會偷偷影響你的耐心。
            <br className="hidden md:block" />
            順手的筆，會讓人願意多寫兩行。」
          </p>
          <p className="eyebrow mt-6 text-paper/70">— 店內牆上的一張字條</p>
        </div>
      </section>

      {/* ── 本週選三樣 ───────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <div className="rule flex items-end justify-between pb-4">
          <div>
            <p className="eyebrow text-ink-soft">02 — 本週想先介紹的</p>
            <h2 className="mt-3 font-tc text-3xl font-bold md:text-[40px]">架上這三樣</h2>
          </div>
          <Link
            href="/shop"
            className="hidden font-tc text-[15px] hover:text-riso-red sm:block"
          >
            看全部 20 樣 →
          </Link>
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── 視差橫幅 2（元件式，內圖位移）────── */}
      <ParallaxBand src="/img/color19.jpg" alt="一排色鉛筆" height="66vh">
        <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8">
          <p className="eyebrow text-paper/80">03 — 架上分類</p>
          <h2 className="mt-3 max-w-lg font-tc text-3xl font-bold text-paper md:text-[40px]">
            東西不多，
            <br />
            但每一格都挑過
          </h2>
        </div>
      </ParallaxBand>

      <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <ul className="rule">
          {categories.map(([name, desc], i) => (
            <li
              key={name}
              className="rule flex flex-col gap-1 py-6 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-tc text-2xl font-medium">{name}</span>
              </div>
              <span className="text-[15px] text-ink-soft sm:text-right">{desc}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm font-tc text-xl leading-relaxed">
            找不到想要的？來店裡跟我們聊，很多東西沒放上網路。
          </p>
          <Link
            href="/shop"
            className="bg-ink px-6 py-3 font-tc text-[15px] text-paper hover:bg-riso-red"
          >
            進去逛逛 →
          </Link>
        </div>
      </section>

      <FloatingDrawButton />
    </>
  );
}
