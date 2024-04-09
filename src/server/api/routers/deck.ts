import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const deckRouter = createTRPCRouter({
  getUnique: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.deck.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });
  }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }

    const deck = await ctx.db.deck.findUnique({
      where: {
        id: input,
      },
      select: {
        deckCards: true,
      },
    });

    if (!deck) {
      return null;
    }

    const quantityQueue = deck.deckCards.map((deckCard) =>
      ctx.db.ownedCard.update({
        where: {
          id: deckCard.ownedCardId,
        },
        select: {
          id: true,
          quantity: true,
        },
        data: {
          quantity: {
            increment: deckCard.quantity,
          },
        },
      }),
    );

    return ctx.db.$transaction([
      ...quantityQueue,
      ctx.db.deckCard.deleteMany({
        where: {
          deckId: input,
        },
      }),
      ctx.db.deck.delete({
        where: {
          id: input,
        },
      }),
    ]);
  }),

  edit: publicProcedure
    .input(
      z.object({
        deckCards: z.array(
          z.object({
            ownedCardId: z.number(),
            quantity: z.number(),
          }),
        ),
        deckId: z.string(),
        deckName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        return null;
      }

      try {
        const deck = await ctx.db.deck.findUnique({
          where: {
            id: input.deckId,
          },
          select: {
            deckCards: true,
          },
        });

        if (!deck) {
          return null;
        }

        const incrementQueue =
          input.deckCards.length > 0
            ? deck.deckCards.map((deckCard) =>
                ctx.db.ownedCard.update({
                  where: {
                    id: deckCard.ownedCardId,
                  },
                  select: {
                    id: true,
                    quantity: true,
                  },
                  data: {
                    quantity: {
                      increment: deckCard.quantity,
                    },
                  },
                }),
              )
            : [];

        const decrementQueue =
          input.deckCards.length > 0
            ? input.deckCards.map((deckCard) =>
                ctx.db.ownedCard.update({
                  where: {
                    id: deckCard.ownedCardId,
                  },
                  data: {
                    quantity: {
                      decrement: deckCard.quantity,
                    },
                  },
                }),
              )
            : [];

        return ctx.db.$transaction([
          ctx.db.deck.update({
            where: {
              id: input.deckId,
            },
            data: {
              name: input.deckName,
              deckCards:
                input.deckCards.length > 0
                  ? {
                      deleteMany: {},
                      create: input.deckCards.map((deckCard) => ({
                        ownedCardId: deckCard.ownedCardId,
                        quantity: deckCard.quantity,
                      })),
                    }
                  : undefined,
            },
          }),
          ...incrementQueue,
          ...decrementQueue,
        ]);
      } catch (e) {
        console.error(e);
        return null;
      }
    }),

  getDeckCards: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.deck.findUnique({
      where: {
        id: input,
      },
      select: {
        deckCards: {
          select: {
            quantity: true,
            deckId: true,
            ownedCardId: true,
          },
        },
      },
    });
  }),
});
