import { Card, Pawn, Rook, Knight, Bishop, Queen } from "./";

export const cardClasses: Record<string, typeof Card> = {
  Pawn: Pawn,
  Rook: Rook,
  Knight: Knight,
  Bishop: Bishop,
  Queen: Queen,
};

export const getCard = (name: string): Card => {
  return !cardClasses[name] ? new Card() : new cardClasses[name]!();
};

export const getStarterCards = () => {
  return StarterCardsQuantity.map((card, index) => ({
    quantity: card,
    cardId: index + 1,
    sellable: false,
  }));
};

export const StarterCardsQuantity = [
  3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 1, 1, 3, 3, 1, 3, 3, 3, 1, 2, 0, 2, 1, 1, 2,
  1,
];
