import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
  }),

  getUnique: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        bio: true,
        username: true,
      },
    });
  }),

  getCurrentUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }

    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        bio: true,
        username: true,
      },
    });
  }),

  getUserByUsername: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: {
          username: input,
        },
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          bio: true,
          username: true,
        },
      });
    }),

  updateBio: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
    if (!ctx.session) {
      return null;
    }

    return ctx.db.user.update({
      where: {
        id: ctx.session.user?.id,
      },
      data: {
        bio: input,
      },
    });
  }),

  getDecks: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    if (!ctx.session) {
      return null;
    }

    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      select: {
        decks: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),

  createDeck: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }

    const { data } = await axios.get(
      "https://random-word-api.herokuapp.com/word?number=1",
    );

    const parsedData = z.array(z.string()).parse(data);

    if (!parsedData[0]) {
      return null;
    }

    return ctx.db.deck.create({
      data: {
        name: parsedData[0],
        userId: ctx.session.user.id!,
      },
    });
  }),

  getCurrentUserOwnedCards: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user) {
      return null;
    }

    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        ownedCards: {
          select: {
            id: true,
            quantity: true,
            cardId: true,
            userId: true,
            sellable: true,
          },
        },
      },
    });
  }),

  getOwnedCards: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input,
      },
      select: {
        ownedCards: {
          select: {
            id: true,
            quantity: true,
            card: {
              select: {
                id: true,
                name: true,
                cost: true,
                image: true,
                description: true,
                rarity: true,
                type: true,
              },
            },
          },
        },
      },
    });
  }),
});
