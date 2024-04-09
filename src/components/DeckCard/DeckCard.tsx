"use client";

import CardDisplay from "../CardDisplay/CardDisplay";
import { OwnedCard } from "@prisma/client";
import { api } from "@/trpc/react";

interface DeckCardProps {
  ownedCard: OwnedCard;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const DeckCard = ({
  ownedCard,
  onClick,
  children,
  className,
}: DeckCardProps) => {
  const { data: card } = api.cards.getUnique.useQuery(ownedCard.cardId);

  if (!card) return null;

  return (
    <CardDisplay card={card} size="small" className={className}>
      <>
        <div
          className={
            "absolute right-0 top-0 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-green-light p-1 ring-2 ring-green-dark"
          }
          onClick={onClick}
        >
          {children}
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0">
          <div className="rounded bg-black bg-opacity-50 p-1 text-white">
            {ownedCard.quantity}
          </div>
        </div>
      </>
    </CardDisplay>
  );
};

export default DeckCard;
