import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const accountRouter = createTRPCRouter({
  getAccessTokenFromId: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.db.account.findFirst({
        where: {
          userId: input,
        },
      });
    }),
});
