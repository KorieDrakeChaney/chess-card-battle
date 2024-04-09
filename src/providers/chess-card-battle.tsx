"use client";

import {
  type ChessCardBattleStore,
  createChessCardBattleStore,
} from "@/stores/chess-card-battle";
import { createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const ChessCardBattleContext =
  createContext<StoreApi<ChessCardBattleStore> | null>(null);

export interface ChessCardBattleStoreProviderProps {
  children: React.ReactNode;
}

export function ChessCardBattleStoreProvider({
  children,
}: ChessCardBattleStoreProviderProps) {
  const storeRef = useRef<StoreApi<ChessCardBattleStore>>();

  if (!storeRef.current) {
    storeRef.current = createChessCardBattleStore();
  }

  return (
    <ChessCardBattleContext.Provider value={storeRef.current}>
      {children}
    </ChessCardBattleContext.Provider>
  );
}

export const useChessCardBattleStore = <T,>(
  selector: (store: ChessCardBattleStore) => T,
): T => {
  const store = useContext(ChessCardBattleContext);

  if (!store) {
    throw new Error(
      "useChessCardBattleStore must be used within a ChessCardBattleStoreProvider",
    );
  }

  return useStore(store, selector);
};
