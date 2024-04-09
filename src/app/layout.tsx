import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ChessCardBattleStoreProvider } from "@/providers/chess-card-battle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ChessCardBattle!",
  description: "A chess card battle game. Play now!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <ChessCardBattleStoreProvider>
            <main>
              <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-dark to-green-dark">
                {children}
              </div>
            </main>
          </ChessCardBattleStoreProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
