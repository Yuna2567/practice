"use client";

import { useState } from "react";

const TOPICS = ["一般詢問", "訂單問題", "商品建議", "想合作、寄賣", "其他"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.email.trim()) next.email = "請留一個 email，我們才回得了信";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "這個 email 看起來怪怪的";
    if (!form.message.trim()) next.message = "想跟我們說什麼呢？";
    setErrors(next);
    if (Object.keys(next).length) return;

    const entry = { ...form, at: new Date().toISOString() };
    try {
      const box = JSON.parse(localStorage.getItem("pg-messages") || "[]");
      box.push(entry);
      localStorage.setItem("pg-messages", JSON.stringify(box));
    } catch {}
    setSent(entry);
    setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
  };

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="eyebrow text-riso-red">聯絡我們</p>
          <h1 className="mt-4 font-tc text-4xl font-black leading-tight md:text-5xl">
            有話
            <br />
            想跟我們說
          </h1>
          <p className="mt-6 max-w-xs text-[16px] leading-8 text-ink-soft">
            訂單、商品、寄賣、或只是想推薦一支好筆給我們——留個 email，
            我們通常兩個工作天內回。
          </p>

          <dl className="rule mt-8 space-y-4 pt-4 text-[15px] leading-7">
            <div>
              <dt className="eyebrow text-ink-soft">Email</dt>
              <dd className="font-mono">hello@papergoods.example</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-soft">店面</dt>
              <dd>台北市大同區赤峰街 3 巷 2 號 2F</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-soft">營業</dt>
              <dd>週三 – 週日　13:00 – 20:00</dd>
            </div>
          </dl>
        </div>

        <div>
          {sent ? (
            <div className="border border-sage/50 bg-sage/10 p-8">
              <p className="eyebrow text-sage">已送出</p>
              <p className="mt-3 font-tc text-2xl font-bold">收到了，謝謝你！</p>
              <p className="mt-3 text-[15px] leading-7 text-ink-soft">
                我們會回信到{" "}
                <span className="font-mono text-ink">{sent.email}</span>。
                主題是「{sent.topic}」。
              </p>
              <button
                onClick={() => setSent(null)}
                className="mt-5 border border-ink px-5 py-2.5 font-tc text-[14px] hover:bg-ink hover:text-paper"
              >
                再寫一封
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <div>
                <label className="eyebrow text-ink-soft" htmlFor="name">
                  怎麼稱呼（可留空）
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  className="mt-1.5 w-full border border-ink/35 bg-paper px-3 py-2.5 font-tc outline-none focus:border-riso-red"
                />
              </div>

              <div>
                <label className="eyebrow text-ink-soft" htmlFor="email">
                  你的 Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={!!errors.email}
                  className={`mt-1.5 w-full border bg-paper px-3 py-2.5 font-mono text-[15px] outline-none focus:border-riso-red ${
                    errors.email ? "border-riso-red" : "border-ink/35"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-[13px] text-riso-red">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="eyebrow text-ink-soft" htmlFor="topic">
                  想聊的是
                </label>
                <select
                  id="topic"
                  value={form.topic}
                  onChange={update("topic")}
                  className="mt-1.5 w-full border border-ink/35 bg-paper px-3 py-2.5 font-tc outline-none focus:border-riso-red"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="eyebrow text-ink-soft" htmlFor="message">
                  內容 *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  className={`mt-1.5 w-full resize-y border bg-paper px-3 py-2.5 font-tc leading-7 outline-none focus:border-riso-red ${
                    errors.message ? "border-riso-red" : "border-ink/35"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[13px] text-riso-red">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-ink px-8 py-3 font-tc text-[15px] text-paper transition-colors hover:bg-riso-red"
              >
                送出
              </button>
              <p className="text-[12px] text-ink-soft">
                送出後我們通常兩個工作天內回信。
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
