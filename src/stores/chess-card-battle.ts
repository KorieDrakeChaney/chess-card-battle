import { Board } from "@/lib/board";
import { Card } from "@/lib/cards";
import { createStore } from "zustand";
import axios from "axios";
import { z } from "zod";

export type ChessCardBattleState = {
  isStarred: boolean;

  deck_1: Card[];
  deck_2: Card[];

  board_state: Board;
  current_turn: number;

  selected_card: number;

  messages: string[];
};

export type ChessCardBattleActions = {
  setDeck_1: (deck: Card[]) => void;
  setDeck_2: (deck: Card[]) => void;

  setBoardState: (board: Board) => void;

  setCurrentTurn: (turn: number) => void;

  setSelectedCard: (card: number) => void;

  addMessage: (chat: string) => void;

  execute: () => Promise<void>;
};

export type ChessCardBattleStore = ChessCardBattleState &
  ChessCardBattleActions;

export const defaultInitState: ChessCardBattleState = {
  isStarred: false,
  messages: [],
  deck_1: [],
  deck_2: [],

  board_state: new Board(),
  current_turn: 1,

  selected_card: -1,
};

export const createChessCardBattleStore = (
  initState: ChessCardBattleState = defaultInitState,
) =>
  createStore<ChessCardBattleStore>((set) => ({
    ...initState,

    setDeck_1: (deck: Card[]) => {
      set({ deck_1: deck });
    },
    setDeck_2: (deck: Card[]) => {
      set({ deck_2: deck });
    },

    setBoardState: (board: Board) => {
      set({ board_state: board });
    },

    setCurrentTurn: (turn: number) => {
      set({ current_turn: turn });
    },

    setSelectedCard: (card: number) => {
      set({ selected_card: card });
    },

    addMessage: (message: string) => {
      set((state) => ({
        messages: [...state.messages, message],
      }));
    },

    execute: async () => {
      try {
        const { data } = await axios.get("/api/user/isStarred");
        const parsedData = z
          .object({
            isStarred: z.boolean(),
          })
          .parse(data);

        if (parsedData.isStarred) {
          set({ isStarred: parsedData.isStarred });
        }
      } catch (error) {}
    },
  }));
