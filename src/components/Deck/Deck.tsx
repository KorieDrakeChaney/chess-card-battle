"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

interface DeckProps {
  id: string;
  name: string;
}

const Deck = ({ id, name }: DeckProps) => {
  const router = useRouter();
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    useState(false);
  const delete_mutation = api.decks.delete.useMutation();
  const deck_cards = api.decks.getDeckCards.useQuery(id);

  const [currentDeckCount, setCurrentDeckCount] = useState(0);

  useEffect(() => {
    if (deck_cards.data) {
      setCurrentDeckCount(
        deck_cards.data.deckCards.reduce((acc, c) => acc + c.quantity, 0),
      );
    }
  }, [deck_cards.data]);

  const onDelete = () => {
    delete_mutation.mutate(id, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <div className="group relative flex h-[240px] w-[180px] flex-col justify-between rounded border-4 bg-green-light px-1 py-2 ">
      <div className="flex justify-between gap-2 text-white opacity-0 group-hover:opacity-100">
        <div>{currentDeckCount}/30 cards</div>
        <div className="flex items-center gap-2">
          <FaRegEdit
            className="cursor-pointer hover:text-gray-300"
            onClick={() => {
              router.push(`/decks/edit/${id}`);
            }}
          />
          <FaRegTrashCan
            className="cursor-pointer hover:text-red-500"
            onClick={() => {
              setDeleteConfirmationDialog(true);
            }}
          />
        </div>
      </div>
      <div className="w-full text-center font-bold text-pink-light">{name}</div>
      {deleteConfirmationDialog && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center"
          onClick={() => {
            setDeleteConfirmationDialog(false);
          }}
        >
          <div className="flex animate-fade flex-col gap-4 rounded bg-white p-4 shadow-md animate-duration-75">
            <div className="text-left">
              Are you sure you want to delete{" "}
              <span className="font-bold">{name}</span>?
            </div>
            <div className="flex gap-4">
              <div
                className="cursor-pointer font-bold text-green-light hover:text-green-dark"
                onClick={() => {
                  setDeleteConfirmationDialog(false);
                }}
              >
                Cancel
              </div>
              <div
                className="cursor-pointer font-bold text-red-500 hover:text-red-700"
                onClick={onDelete}
              >
                Confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
