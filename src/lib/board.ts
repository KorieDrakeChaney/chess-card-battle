import {
  type ChessColor,
  type ChessPiece,
  type SquareType,
  PieceType,
  FILE_A,
  FILE_B,
  FILE_G,
  FILE_H,
  RANK_1,
  RANK_2,
  RANK_7,
  RANK_8,
  ZERO,
  WHITE_ZONE,
  BLACK_ZONE,
  WHITE_CORNERS,
  BLACK_CORNERS,
} from "./utils";

type ChessMove = {
  from: SquareType;
  to: SquareType;
  promotion?: ChessPiece;
};

export class Board {
  private white = BigInt(0);
  private black = BigInt(0);
  private invalid = BigInt(0);

  private pieces: [bigint, bigint, bigint, bigint, bigint, bigint, bigint] = [
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
    BigInt(0),
  ];

  private legal_moves = new Map<bigint, bigint>();

  public turn = true;
  en_passant_square: bigint | null = null;

  half_move = 0;
  full_move = 1;

  board_repetitions: Record<string, number> = {};

  public history: Array<ChessMove> = [];

  generate_pawn_moves(square: bigint): bigint {
    const color: boolean = (this.white & square) != ZERO;

    if (color) {
      let mask = ZERO;

      if (((square << BigInt(7)) & this.black) != ZERO) {
        mask |= square << BigInt(7);
      }

      if (((square << BigInt(9)) & this.black) != ZERO) {
        mask |= square << BigInt(9);
      }

      if (((square << BigInt(8)) & this.board()) == ZERO) {
        mask |= square << BigInt(8);

        if ((square & RANK_2) != ZERO) {
          if (((square << BigInt(16)) & this.board()) == ZERO) {
            mask |= square << BigInt(16);
          }
        }
      }

      if (this.en_passant_square != null) {
        if (
          ((square << BigInt(7)) & this.en_passant_square) != ZERO ||
          ((square << BigInt(9)) & this.en_passant_square) != ZERO
        ) {
          mask |= this.en_passant_square;
        }
      }

      return mask;
    } else {
      let mask = ZERO;

      if (((square >> BigInt(7)) & this.white) != ZERO) {
        mask |= square >> BigInt(7);
      }

      if (((square >> BigInt(9)) & this.white) != ZERO) {
        mask |= square >> BigInt(9);
      }

      if (((square >> BigInt(8)) & this.board()) == ZERO) {
        mask |= square >> BigInt(8);

        if ((square & RANK_2) != ZERO) {
          if (((square >> BigInt(16)) & this.board()) == ZERO) {
            mask |= square >> BigInt(16);
          }
        }
      }

      if (this.en_passant_square != null) {
        if (
          ((square >> BigInt(7)) & this.en_passant_square) != ZERO ||
          ((square >> BigInt(9)) & this.en_passant_square) != ZERO
        ) {
          mask |= this.en_passant_square;
        }
      }

      return mask;
    }
  }

  generate_knight_moves(square: bigint): bigint {
    let mask = ZERO;

    if ((square & FILE_A) == ZERO && (square & (RANK_8 | RANK_7)) == ZERO) {
      mask |= square << BigInt(15);
    }

    if ((square & FILE_H) == ZERO && (square & (RANK_8 | RANK_7)) == ZERO) {
      mask |= square << BigInt(17);
    }

    if ((square & FILE_A) == ZERO && (square & (RANK_2 | RANK_1)) == ZERO) {
      mask |= square >> BigInt(17);
    }

    if ((square & FILE_H) == ZERO && (square & (RANK_2 | RANK_1)) == ZERO) {
      mask |= square >> BigInt(15);
    }

    if ((square & (FILE_A | FILE_B)) == ZERO && (square & RANK_8) == ZERO) {
      mask |= square << BigInt(6);
    }

    if ((square & (FILE_H | FILE_G)) == ZERO && (square & RANK_8) == ZERO) {
      mask |= square << BigInt(10);
    }

    if ((square & (FILE_A | FILE_B)) == ZERO && (square & RANK_1) == ZERO) {
      mask |= square >> BigInt(10);
    }

    if ((square & (FILE_H | FILE_G)) == ZERO && (square & RANK_1) == ZERO) {
      mask |= square >> BigInt(6);
    }

    return mask;
  }

  generate_rook_moves(square: bigint): bigint {
    let mask = ZERO;

    let north = square;
    while ((north & RANK_8) == ZERO) {
      north <<= BigInt(8);
      mask |= north;

      if ((north & this.board()) != ZERO) {
        break;
      }
    }

    let south = square;
    while ((south & RANK_1) == ZERO) {
      south >>= BigInt(8);
      mask |= south;

      if ((south & this.board()) != ZERO) {
        break;
      }
    }

    let east = square;
    while ((east & FILE_H) == ZERO) {
      east <<= BigInt(1);
      mask |= east;

      if ((east & this.board()) != ZERO) {
        break;
      }
    }

    let west = square;
    while ((west & FILE_A) == ZERO) {
      west >>= BigInt(1);
      mask |= west;

      if ((west & this.board()) != ZERO) {
        break;
      }
    }

    return mask;
  }

  generate_bishop_moves(square: bigint): bigint {
    let mask = ZERO;

    let north_east = square;
    while ((north_east & (RANK_8 | FILE_H)) == ZERO) {
      north_east <<= BigInt(9);
      mask |= north_east;

      if ((north_east & this.board()) != ZERO) {
        break;
      }
    }

    let south_east = square;
    while ((south_east & (RANK_1 | FILE_H)) == ZERO) {
      south_east >>= BigInt(7);
      mask |= south_east;

      if ((south_east & this.board()) != ZERO) {
        break;
      }
    }

    let south_west = square;
    while ((south_west & (RANK_1 | FILE_A)) == ZERO) {
      south_west >>= BigInt(9);
      mask |= south_west;

      if ((south_west & this.board()) != ZERO) {
        break;
      }
    }

    let north_west = square;
    while ((north_west & (RANK_8 | FILE_A)) == ZERO) {
      north_west <<= BigInt(7);
      mask |= north_west;

      if ((north_west & this.board()) != ZERO) {
        break;
      }
    }

    return mask;
  }

  generate_queen_moves(square: bigint): bigint {
    return (
      this.generate_rook_moves(square) | this.generate_bishop_moves(square)
    );
  }

  generate_king_moves(square: bigint): bigint {
    let mask = ZERO;

    if ((square & FILE_A) == ZERO && (square & RANK_8) == ZERO) {
      mask |= square << BigInt(9);
    }

    if ((square & RANK_8) == ZERO) {
      mask |= square << BigInt(8);
    }

    if ((square & FILE_H) == ZERO && (square & RANK_8) == ZERO) {
      mask |= square << BigInt(7);
    }

    if ((square & FILE_A) == ZERO) {
      mask |= square << BigInt(1);
    }

    if ((square & FILE_H) == ZERO) {
      mask |= square >> BigInt(1);
    }

    if ((square & FILE_A) == ZERO && (square & RANK_1) == ZERO) {
      mask |= square >> BigInt(7);
    }

    if ((square & RANK_1) == ZERO) {
      mask |= square >> BigInt(8);
    }

    if ((square & FILE_H) == ZERO && (square & RANK_1) == ZERO) {
      mask |= square >> BigInt(9);
    }

    return mask;
  }

  get_piece_at_square(square: bigint): ChessPiece {
    if ((this.pieces[PieceType.PAWN] & square) != ZERO) {
      return "pawn";
    }

    if ((this.pieces[PieceType.KNIGHT] & square) != ZERO) {
      return "knight";
    }

    if ((this.pieces[PieceType.BISHOP] & square) != ZERO) {
      return "bishop";
    }

    if ((this.pieces[PieceType.ROOK] & square) != ZERO) {
      return "rook";
    }

    if ((this.pieces[PieceType.QUEEN] & square) != ZERO) {
      return "queen";
    }

    if ((this.pieces[PieceType.KING] & square) != ZERO) {
      return "king";
    }

    if ((this.pieces[PieceType.TRAP] & square) != ZERO) {
      return "trap";
    }

    return "unknown";
  }

  generate_psuedo_legal_moves(): void {
    for (let i = 0; i < 64; i++) {
      const square = BigInt(1) << BigInt(i);

      if ((this.board() & square) == ZERO) {
        this.legal_moves.set(square, ZERO);
        continue;
      } else {
        const piece = this.get_piece_at_square(square);
        const color = (this.white & square) != ZERO;

        if (color != this.turn) {
          this.legal_moves.set(square, ZERO);
          continue;
        }

        if (piece == "pawn") {
          this.legal_moves.set(square, this.generate_pawn_moves(square));
        } else if (piece == "knight") {
          const mask = this.generate_knight_moves(square);

          this.legal_moves.set(square, mask & ~this.get_color_mask(color));
        } else if (piece == "bishop") {
          const mask = this.generate_bishop_moves(square);

          this.legal_moves.set(square, mask & ~this.get_color_mask(color));
        } else if (piece == "rook") {
          const mask = this.generate_rook_moves(square);

          this.legal_moves.set(square, mask & ~this.get_color_mask(color));
        } else if (piece == "queen") {
          const mask = this.generate_queen_moves(square);

          this.legal_moves.set(square, mask & ~this.get_color_mask(color));
        } else if (piece == "king") {
          const mask = this.generate_king_moves(square);

          this.legal_moves.set(square, mask & ~this.get_color_mask(color));
        }
      }
    }
  }

  is_rook(): boolean {
    return (
      (this.get_color_mask(this.turn) & this.pieces[PieceType.ROOK]) != ZERO
    );
  }

  get_color_mask(color: boolean): bigint {
    return color ? this.white : this.black;
  }

  board(): bigint {
    return this.white | this.black;
  }

  move(chess_move: ChessMove) {
    const from = BigInt(1) << BigInt(chess_move.from);
    const to = BigInt(1) << BigInt(chess_move.to);

    const valid_moves = this.legal_moves.get(from);

    if (valid_moves == undefined) {
      return;
    }

    if ((valid_moves & to) != ZERO) {
      const piece = this.get_piece_at_square(from);
      const color = (this.white & from) != ZERO;

      switch (piece) {
        case "pawn":
          this.half_move = 0;
          break;
        default:
          this.half_move++;
          break;
      }

      if ((color ? this.black : this.white) & to) {
        this.remove(chess_move.to);
        this.half_move = 0;
      }

      switch (piece) {
        case "pawn":
          if (color) {
            if ((to & RANK_8) != ZERO) {
              this.place(
                chess_move.promotion ? chess_move.promotion : "queen",
                "white",
                chess_move.to,
              );
            } else {
              this.pieces[PieceType.PAWN] |= to;
            }
            this.pieces[PieceType.PAWN] &= ~from;
          } else {
            if ((to & RANK_1) != ZERO) {
              this.place(
                chess_move.promotion ? chess_move.promotion : "queen",
                "black",
                chess_move.to,
              );
            } else {
              this.pieces[PieceType.PAWN] |= to;
            }
            this.pieces[PieceType.PAWN] &= ~from;
          }
          break;

        case "knight":
          this.pieces[PieceType.KNIGHT] &= ~from;
          this.pieces[PieceType.KNIGHT] |= to;
          break;
        case "bishop":
          this.pieces[PieceType.BISHOP] &= ~from;
          this.pieces[PieceType.BISHOP] |= to;
          break;
        case "rook":
          this.pieces[PieceType.ROOK] &= ~from;
          this.pieces[PieceType.ROOK] |= to;
          break;
        case "queen":
          this.pieces[PieceType.QUEEN] &= ~from;
          this.pieces[PieceType.QUEEN] |= to;
          break;
        case "king":
          this.pieces[PieceType.KING] &= ~from;
          this.pieces[PieceType.KING] |= to;
          break;
        default:
          break;
      }

      if (color) {
        this.white &= ~from;
        this.white |= to;
      } else {
        this.black &= ~from;
        this.black |= to;
      }

      this.history.push(chess_move);
    }
  }

  place(piece: ChessPiece, color: ChessColor, square: SquareType) {
    const mask = BigInt(1) << BigInt(square);

    switch (piece) {
      case "pawn":
        this.pieces[PieceType.PAWN] |= mask;
        break;
      case "knight":
        this.pieces[PieceType.KNIGHT] |= mask;
        break;
      case "bishop":
        this.pieces[PieceType.BISHOP] |= mask;
        break;
      case "rook":
        this.pieces[PieceType.ROOK] |= mask;
        break;
      case "queen":
        this.pieces[PieceType.QUEEN] |= mask;
        break;
      case "king":
        this.pieces[PieceType.KING] |= mask;
        break;
      case "trap":
        this.pieces[PieceType.TRAP] |= mask;
        break;
      default:
        break;
    }

    if (color == "white") {
      this.white |= mask;
    } else {
      this.black |= mask;
    }
  }

  remove(square: SquareType) {
    const mask = BigInt(1) << BigInt(square);
    if ((this.board() & mask) == ZERO) return;

    const color = (this.white & mask) != ZERO;
    const piece = this.get_piece_at_square(mask);

    switch (piece) {
      case "pawn":
        this.pieces[PieceType.PAWN] &= ~mask;
        break;
      case "knight":
        this.pieces[PieceType.KNIGHT] &= ~mask;
        break;
      case "bishop":
        this.pieces[PieceType.BISHOP] &= ~mask;
        break;
      case "rook":
        this.pieces[PieceType.ROOK] &= ~mask;
        break;
      case "queen":
        this.pieces[PieceType.QUEEN] &= ~mask;
        break;
      case "king":
        this.pieces[PieceType.KING] &= ~mask;
        break;
      case "trap":
        this.pieces[PieceType.TRAP] &= ~mask;
        break;
      default:
        break;
    }

    if (color) {
      this.white &= ~mask;
    } else {
      this.black &= ~mask;
    }
  }

  is_white_zone_full(): boolean {
    return (this.board() & WHITE_ZONE) == WHITE_ZONE;
  }

  is_black_zone_full(): boolean {
    return (this.board() & BLACK_ZONE) == BLACK_ZONE;
  }

  is_white_corners_full(): boolean {
    return (this.board() & WHITE_CORNERS) == WHITE_CORNERS;
  }

  is_black_corners_full(): boolean {
    return (this.board() & BLACK_CORNERS) == BLACK_CORNERS;
  }

  empty_squares(): bigint {
    return ~this.board();
  }
}
