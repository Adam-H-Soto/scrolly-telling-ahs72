import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wired — The AI Integration Story",
  description:
    "A cinematic journey through the hidden complexity of modern software integration, and how AI is streamlining it.",
  openGraph: {
    title: "Wired — The AI Integration Story",
    description:
      "A cinematic journey through the hidden complexity of modern software integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="icon" href={`${base}/favicon.svg`} type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
