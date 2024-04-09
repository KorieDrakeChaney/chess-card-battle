import { Chat, Header } from "@/components";
import { env } from "@/env";
import ChessCardBattleFlagsmithProvider from "@/providers/flagsmith";
import flagsmith from "flagsmith/isomorphic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const flagsmithState = await flagsmith
    .init({
      environmentID: env.FLAGSMITH_ENV_ID,
    })
    .then(() => flagsmith.getState());
  return (
    <div className="flex min-h-screen w-full flex-col">
      <ChessCardBattleFlagsmithProvider flagsmithState={flagsmithState}>
        <Header />
        {children}
        <Chat />
      </ChessCardBattleFlagsmithProvider>
    </div>
  );
}
