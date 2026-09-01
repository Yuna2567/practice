import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata = {
  title: {
    default: "紙貨行 PAPER GOODS — 只賣自己會用的文具",
    template: "%s — 紙貨行",
  },
  description:
    "一間開在巷子二樓的小文具店。鋼筆、紙品、桌上小物，都是自己用過覺得好才上架。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+TC:wght@400;500;700;900&family=Zilla+Slab:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
