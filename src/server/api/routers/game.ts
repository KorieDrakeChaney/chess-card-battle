import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.game.findMany({});
  }),
});
