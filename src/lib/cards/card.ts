import { Board } from "../board";
import {
  BLACK_ZONE,
  type ChessColor,
  type SquareType,
  WHITE_ZONE,
} from "../utils";

export class Card {
  active(board_state: Board, color: ChessColor): boolean {
    if (color === "white" ? !board_state.turn : board_state.turn) return false;

    if (color === "white") {
      return !board_state.is_white_zone_full();
    } else {
      return !board_state.is_black_zone_full();
    }
  }

  active_squares(board_state: Board, color: ChessColor): bigint {
    if (color === "white") {
      return WHITE_ZONE & ~board_state.board();
    } else {
      return BLACK_ZONE & ~board_state.board();
    }
  }

  action(board_state: Board, square: SquareType, color: ChessColor) {
    throw new Error("Not implemented");
  }
}
