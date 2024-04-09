"use client";

import { api } from "@/trpc/react";
import { OwnedCard } from "@prisma/client";
import { useEffect, useState } from "react";
import DeckCard from "../DeckCard/DeckCard";
import { FaPlus, FaTimes } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";

type DeckCard = {
  ownedCardId: number;
  deckId: string;
  quantity: number;
};

interface DeckEditProps {
  id: string;
  name: string;
  ownedCards: OwnedCard[];
}

const DeckEdit = ({ id, name, ownedCards }: DeckEditProps) => {
  const { data: currentCards } = api.decks.getDeckCards.useQuery(id);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDeckCount, setCurrentDeckCount] = useState(0);
  const [deckName, setDeckName] = useState(name);
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [deckPile, setDeckPile] = useState<OwnedCard[]>(ownedCards);
  const [hasMadeChanges, setHasMadeChanges] = useState(false);

  useEffect(() => {
    if (currentCards) {
      setDeck(currentCards.deckCards);
      setCurrentDeckCount(
        currentCards.deckCards.reduce((acc, c) => acc + c.quantity, 0),
      );
    }
  }, [currentCards]);

  const mutation = api.decks.edit.useMutation();

  const onCardRemove = (card: DeckCard) => {
    if (!hasMadeChanges) {
      setHasMadeChanges(true);
    }
    setDeck(
      deck
        .map((c) =>
          c.ownedCardId === card.ownedCardId
            ? { ...c, quantity: c.quantity - 1 }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );

    setDeckPile(
      deckPile.map((c) =>
        c.id === card.ownedCardId ? { ...c, quantity: c.quantity + 1 } : c,
      ),
    );

    setCurrentDeckCount(currentDeckCount - 1);
  };

  const onAddCard = (new_card: OwnedCard) => {
    if (currentDeckCount >= 30) return;

    if (!hasMadeChanges) {
      setHasMadeChanges(true);
    }

    const sum = deck.reduce((acc, c) => acc + c.quantity, 0);

    setDeckPile(
      deckPile.map((c) =>
        c.id === new_card.id ? { ...c, quantity: c.quantity - 1 } : c,
      ),
    );
    const card = deck.find((c) => c.ownedCardId === new_card.id);
    if (card) {
      setDeck(
        deck.map((c) =>
          c.ownedCardId === new_card.id
            ? { ...c, quantity: c.quantity + 1 }
            : c,
        ),
      );
    } else {
      setDeck([
        ...deck,
        {
          ownedCardId: new_card.id,
          deckId: id,
          quantity: 1,
        },
      ]);
    }
    setCurrentDeckCount(sum + 1);
  };

  const saveAll = () => {
    if (!isLoading) {
      setIsLoading(true);
      mutation.mutate({
        deckId: id,
        deckName: deckName ?? name,
        deckCards: deck.map((card) => ({
          ownedCardId: card.ownedCardId,
          quantity: card.quantity,
        })),
      });
    }
  };

  const saveName = () => {
    if (!isLoading) {
      setIsLoading(true);
      mutation.mutate({
        deckId: id,
        deckName: deckName ?? name,
        deckCards: [],
      });
    }
  };

  useEffect(() => {
    if (mutation.data) {
      setIsLoading(false);
      setHasMadeChanges(false);
    }
  }, [mutation.data]);

  return (
    <div className="flex w-full flex-grow flex-col justify-center gap-4 p-4 ">
      <div className="flex items-center justify-center gap-2 text-center">
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <label className="text-white opacity-40">Deck Name: </label>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={deckName}
              size={0}
              disabled={isLoading}
              placeholder="Enter deck name here"
              className="w-[200px] cursor-pointer border-2 border-white border-opacity-10 text-center text-[1.5rem] text-white outline-none transition-all hover:border-white focus:border-white xs:w-[250px]  sm:text-[1.5rem]"
              style={{
                backgroundColor: "transparent",
              }}
              onChange={(e) => {
                if (e.target.value.length <= 15) {
                  setDeckName(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveName();
                }
              }}
            />
            <div
              className="flex cursor-pointer items-center gap-1 text-white opacity-50 hover:opacity-100"
              onClick={saveName}
            >
              {15 - deckName.length} <AiOutlineEnter />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative flex h-[300px] flex-wrap justify-center gap-2 overflow-y-scroll border p-4">
          {deck.map((card) => {
            const ownedCard = ownedCards.find((c) => c.id === card.ownedCardId);
            if (card.quantity === 0 || !ownedCard) return null;
            return (
              <DeckCard
                key={card.ownedCardId}
                ownedCard={{
                  ...ownedCard,
                  quantity: card.quantity,
                }}
                className="z-10"
                onClick={() => {
                  onCardRemove(card);
                }}
              >
                <div className="text-white">
                  <FaTimes />
                </div>
              </DeckCard>
            );
          })}

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-gray-200   md:text-4xl lg:text-5xl"
            style={{
              opacity: currentDeckCount > 0 ? 0.05 : 0.2,
            }}
          >
            DECK {currentDeckCount}/30
          </div>
        </div>

        <div className="flex w-full items-center justify-center ">
          <div
            className="flex w-[150px] cursor-pointer flex-col items-center rounded bg-green-light px-2 py-1 text-center text-white hover:opacity-80 active:opacity-100"
            onClick={() => {
              if (hasMadeChanges) saveAll();
            }}
          >
            <div
              className="text-center text-white"
              style={{
                opacity: currentDeckCount == 30 ? 1 : 0.5,
              }}
            >
              {" "}
              DECK {currentDeckCount}/30{" "}
            </div>
            {isLoading ? "Saving..." : "Save"}
          </div>
        </div>
      </div>
      <div className="relative flex h-[300px] flex-wrap justify-center gap-2 overflow-y-scroll border p-4 shadow-md">
        {deckPile.map((card) => {
          if (card.quantity === 0) return null;
          return (
            <DeckCard
              key={card.id}
              ownedCard={card}
              onClick={() => {
                onAddCard(card);
              }}
              className="z-10"
            >
              <div className="text-white">
                <FaPlus />
              </div>
            </DeckCard>
          );
        })}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform text-gray-200 opacity-5 md:text-4xl lg:text-5xl">
          YOUR CARDS
        </div>
      </div>
    </div>
  );
};

export default DeckEdit;
