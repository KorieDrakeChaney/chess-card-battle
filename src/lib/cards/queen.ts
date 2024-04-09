import { Board } from "../board";
import type { ChessColor, SquareType } from "../utils";
import { Card } from "./card";

export default class Queen extends Card {
  action(board_state: Board, square: SquareType, color: ChessColor): void {
    board_state.place("queen", color, square);
  }
}
