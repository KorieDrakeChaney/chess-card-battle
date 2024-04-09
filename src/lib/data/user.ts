import { db } from "@/server/db";

export const getUsersOwnedCardsById = async (userId: string) => {
  return db.ownedCard.findMany({
    where: {
      userId,
    },
  });
};

export const getUserById = async (id: string) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      emailVerified: true,
    },
  });
};
