import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.card.findMany({
      select: {
        id: true,
        name: true,
        cost: true,
        image: true,
        description: true,
        rarity: true,
        type: true,
      },
    });
  }),

  getUnique: publicProcedure.input(z.number()).query(({ input, ctx }) => {
    return ctx.db.card.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
