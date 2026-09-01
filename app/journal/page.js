import { Parallax } from "@/components/Parallax";

export const metadata = {
  title: "誌",
  description: "紙貨行不定期寫的一些字：關於保養、關於挑選、關於為什麼。",
};

const posts = [
  {
    tag: "保養",
    date: "2024.11",
    title: "鋼筆放了三個月不出水，先別急著送修",
    excerpt:
      "多數情況是墨水乾在筆舌裡。用室溫的水泡一個晚上，隔天用吸墨器來回幾次就通了。真的還是不行，再帶來店裡。",
    image: "/img/pen1.jpg",
  },
  {
    tag: "挑選",
    date: "2024.09",
    title: "第一本手帳，別買太漂亮的",
    excerpt:
      "封面太美會捨不得寫。挑一本你敢拿筆亂畫的，寫壞一頁也不心疼的，才寫得完。留白比格線重要。",
    image: "/img/plan9.jpg",
  },
  {
    tag: "為什麼",
    date: "2024.06",
    title: "我們為什麼不辦會員集點",
    excerpt:
      "集點會讓人為了湊點數而買不需要的東西。我們寧可你少買一點、用久一點，下次想到我們是因為東西好用，不是因為差三點。",
    image: "/img/letter20.jpg",
  },
  {
    tag: "現場",
    date: "2024.03",
    title: "試寫桌上那瓶墨水，是這樣調出來的",
    excerpt:
      "跟雲林的老師傅來回試了十一次。藍要壓一點紅進去才不會太冷，但紅多了乾了會發紫。第十二次我們都點頭。",
    image: "/img/ink7.jpg",
  },
];

export default function JournalPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/20">
        <Parallax
          speed={-0.13}
          className="pointer-events-none absolute -right-12 top-6 hidden w-[30vw] max-w-sm md:block"
        >
          <img src="/img/calli15.jpg" alt="" className="photo w-full border border-ink/20" />
        </Parallax>
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <p className="eyebrow text-riso-red">紙貨行 · 誌</p>
          <h1 className="mt-4 font-tc text-4xl font-black md:text-6xl">寫下來的字</h1>
          <p className="mt-5 max-w-md text-[16px] leading-8 text-ink-soft">
            不定期更新。多半是客人問過的問題，我們想一次講清楚。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
        <ul className="rule">
          {posts.map((post, i) => (
            <li key={post.title} className="rule py-10 first:border-t-0">
              <article className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-10">
                <div className="order-2 md:order-1">
                  <img
                    src={post.image}
                    alt=""
                    className={`photo aspect-[4/3] w-full border border-ink/20 object-cover ${
                      i % 2 ? "md:rotate-[0.8deg]" : "md:-rotate-[0.8deg]"
                    }`}
                  />
                </div>
                <div className="order-1 md:order-2">
                  <p className="eyebrow text-ink-soft">
                    {post.tag} · {post.date}
                  </p>
                  <h2 className="mt-3 font-tc text-2xl font-bold leading-snug md:text-[28px]">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-prose text-[16px] leading-8 text-ink-soft">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block border-b border-ink pb-0.5 font-tc text-[15px] text-ink-soft">
                    全文整理中
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
