import { Board } from "../board";
import type { ChessColor, SquareType } from "../utils";
import { Card } from "./card";

export default class Knight extends Card {
  action(board_state: Board, square: SquareType, color: ChessColor): void {
    board_state.place("knight", color, square);
  }
}
