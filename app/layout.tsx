import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "诗心鉴 · 你与哪位中国诗人，隔世相知？",
  description: "32 个选择，照见与你最相契的中国诗心。一个中国古典诗词文化娱乐测试。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
