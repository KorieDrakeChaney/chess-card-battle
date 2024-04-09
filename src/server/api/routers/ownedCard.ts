import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const ownedCardRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.ownedCard.findMany({
      where: {
        userId: input,
      },
      select: {
        id: true,
        cardId: true,
        userId: true,
        quantity: true,
        card: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        cardId: z.number(),
        quantity: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.ownedCard.create({
        data: {
          userId: input.userId,
          cardId: input.cardId,
          quantity: input.quantity,
        },
      });
    }),
});
