import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shixinjian.example"),
  title: "诗心鉴 · 一面借诗照人的镜",
  description: "32 个关于现实、关系与时间的选择，找到与你当下最接近的中国诗心。",
  openGraph: { title:"诗心鉴 · 一面借诗照人的镜", description:"你的选择，会在哪位诗人那里得到回声？", type:"website", locale:"zh_CN" },
  twitter: { card:"summary_large_image", title:"诗心鉴", description:"一面借诗照人的镜" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
