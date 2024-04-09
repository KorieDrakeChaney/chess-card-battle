export const RANK_1 = BigInt("0x00000000000000FF");
export const RANK_2 = BigInt("0x000000000000FF00");
export const RANK_3 = BigInt("0x0000000000FF0000");
export const RANK_4 = BigInt("0x00000000FF000000");
export const RANK_5 = BigInt("0x000000FF00000000");
export const RANK_6 = BigInt("0x0000FF0000000000");
export const RANK_7 = BigInt("0x00FF000000000000");
export const RANK_8 = BigInt("0xFF00000000000000");

export const FILE_A = BigInt("0x0101010101010101");
export const FILE_B = BigInt("0x0202020202020202");
export const FILE_C = BigInt("0x0404040404040404");
export const FILE_D = BigInt("0x0808080808080808");
export const FILE_E = BigInt("0x1010101010101010");
export const FILE_F = BigInt("0x2020202020202020");
export const FILE_G = BigInt("0x4040404040404040");
export const FILE_H = BigInt("0x8080808080808080");
export const WHITE_ZONE =
  BigInt(0b0000000000000000000000000000000000000000000000001111111111111111);
export const BLACK_ZONE =
  BigInt(0b1111111111111111000000000000000000000000000000000000000000000000);

export const WHITE_CORNERS =
  BigInt(0b0000000000000000000000000000000000000000000000000000000010000001);

export const BLACK_CORNERS =
  BigInt(0b1000000100000000000000000000000000000000000000000000000000000000);

export type ChessColor = "white" | "black";

export type ChessPiece =
  | "pawn"
  | "knight"
  | "bishop"
  | "rook"
  | "queen"
  | "king"
  | "trap"
  | "unknown";

export enum SquareType {
  A1 = 0,
  B1 = 1,
  C1 = 2,
  D1 = 3,
  E1 = 4,
  F1 = 5,
  G1 = 6,
  H1 = 7,
  A2 = 8,
  B2 = 9,
  C2 = 10,
  D2 = 11,
  E2 = 12,
  F2 = 13,
  G2 = 14,
  H2 = 15,
  A3 = 16,
  B3 = 17,
  C3 = 18,
  D3 = 19,
  E3 = 20,
  F3 = 21,
  G3 = 22,
  H3 = 23,
  A4 = 24,
  B4 = 25,
  C4 = 26,
  D4 = 27,
  E4 = 28,
  F4 = 29,
  G4 = 30,
  H4 = 31,
  A5 = 32,
  B5 = 33,
  C5 = 34,
  D5 = 35,
  E5 = 36,
  F5 = 37,
  G5 = 38,
  H5 = 39,
  A6 = 40,
  B6 = 41,
  C6 = 42,
  D6 = 43,
  E6 = 44,
  F6 = 45,
  G6 = 46,
  H6 = 47,
  A7 = 48,
  B7 = 49,
  C7 = 50,
  D7 = 51,
  E7 = 52,
  F7 = 53,
  G7 = 54,
  H7 = 55,
  A8 = 56,
  B8 = 57,
  C8 = 58,
  D8 = 59,
  E8 = 60,
  F8 = 61,
  G8 = 62,
  H8 = 63,
}

export const SQUARES: SquareType[] = [
  SquareType.A1,
  SquareType.B1,
  SquareType.C1,
  SquareType.D1,
  SquareType.E1,
  SquareType.F1,
  SquareType.G1,
  SquareType.H1,
  SquareType.A2,
  SquareType.B2,
  SquareType.C2,
  SquareType.D2,
  SquareType.E2,
  SquareType.F2,
  SquareType.G2,
  SquareType.H2,
  SquareType.A3,
  SquareType.B3,
  SquareType.C3,
  SquareType.D3,
  SquareType.E3,
  SquareType.F3,
  SquareType.G3,
  SquareType.H3,
  SquareType.A4,
  SquareType.B4,
  SquareType.C4,
  SquareType.D4,
  SquareType.E4,
  SquareType.F4,
  SquareType.G4,
  SquareType.H4,
  SquareType.A5,
  SquareType.B5,
  SquareType.C5,
  SquareType.D5,
  SquareType.E5,
  SquareType.F5,
  SquareType.G5,
  SquareType.H5,
  SquareType.A6,
  SquareType.B6,
  SquareType.C6,
  SquareType.D6,
  SquareType.E6,
  SquareType.F6,
  SquareType.G6,
  SquareType.H6,
  SquareType.A7,
  SquareType.B7,
  SquareType.C7,
  SquareType.D7,
  SquareType.E7,
  SquareType.F7,
  SquareType.G7,
  SquareType.H7,
  SquareType.A8,
  SquareType.B8,
  SquareType.C8,
  SquareType.D8,
  SquareType.E8,
  SquareType.F8,
  SquareType.G8,
  SquareType.H8,
];

export enum PieceType {
  PAWN = 0,
  KNIGHT = 1,
  BISHOP = 2,
  ROOK = 3,
  QUEEN = 4,
  KING = 5,
  TRAP = 6,
  UNKNOWN = 7,
}

export const ZERO = BigInt(0);
export const ONE = BigInt(1);

export const getSquaresInBitboard = (bitboard: bigint): bigint[] => {
  const squares = [];

  for (let i = 0; i < 64; i++) {
    if ((bitboard & (BigInt(1) << BigInt(i))) !== ZERO) {
      squares.push(BigInt(i));
    }
  }

  return squares;
};
