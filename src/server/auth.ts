import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./db";
import { getStarterCards } from "@/lib/cards/utils";
import { getUsersOwnedCardsById, getUserById } from "@/lib/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id!);

      if (existingUser) {
        if (!existingUser.emailVerified) return false;
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
      }

      const ownedCards = await getUsersOwnedCardsById(session.user.id);

      if (!ownedCards.length) {
        const starterCards = getStarterCards().map(
          ({ cardId, quantity, sellable }) => {
            return db.ownedCard.create({
              data: {
                userId: session.user.id,
                cardId,
                quantity,
                sellable,
              },
            });
          },
        );

        await db.$transaction(starterCards);
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
