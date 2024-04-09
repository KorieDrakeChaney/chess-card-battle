import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { cardRouter } from "./routers/card";
import { ownedCardRouter } from "./routers/ownedCard";
import { deckRouter } from "./routers/deck";
import { gameRouter } from "./routers/game";
import { accountRouter } from "./routers/account";
import { chatRouter } from "./routers/chat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  cards: cardRouter,
  ownedCards: ownedCardRouter,
  decks: deckRouter,
  games: gameRouter,
  account: accountRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
