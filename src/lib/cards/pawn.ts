import { Board } from "../board";
import { type ChessColor, type SquareType } from "../utils";
import { Card } from "./card";

export default class Pawn extends Card {
  action(board_state: Board, square: SquareType, color: ChessColor): void {
    board_state.place("pawn", color, square);
  }
}
