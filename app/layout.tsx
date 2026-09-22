import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { NotificacoesProvider } from "@/context/NotificacoesContext";
=======
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "FazUno",
  description: "Tudo o que sua casa precisa em um só lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${dmSans.variable} antialiased`}
    >
      <body className="w-full">
<<<<<<< HEAD
        <NotificacoesProvider>
          {children}
        </NotificacoesProvider>
=======
        {children}
>>>>>>> bbd136c22832df1cac739ce4c8ace8c00814fd4b
      </body>
    </html>
  );
}