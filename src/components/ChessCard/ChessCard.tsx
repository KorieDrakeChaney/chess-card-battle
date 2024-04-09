"use client";

import { Gem } from "@/icons";
import { type Card } from "@/lib/cards";
import Image from "next/image";
import { RarityColors } from "../utils";
import { useState } from "react";
import { getCard } from "@/lib/cards/utils";

interface ChessCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
  cost: number;
  type: string;
  rarity: string;
  size?: "small" | "medium" | "large";
  turnable?: boolean;
}

const ChessCard = ({
  id,
  name,
  image,
  description,
  cost,
  type,
  rarity,
  turnable = true,
  size = "medium",
}: ChessCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [card, setCard] = useState<Card | null>(getCard(name));

  const dimensions = {
    small: {
      width: "100px",
      height: "130px",
      gem: "20px",
      gemFont: "0.75rem",
      image: 100,
      font: "0.5rem",
    },
    medium: {
      width: "200px",
      height: "240px",
      gem: "40px",
      gemFont: "1rem",
      image: 200,
      font: "0.75rem",
    },
    large: {
      width: "300px",
      height: "350px",
      gem: "60px",
      gemFont: "1.25rem",
      image: 300,
      font: "1.25rem",
    },
  };

  return (
    <div
      className="relative flex flex-col  rounded transition-all hover:cursor-pointer"
      style={{
        border: `solid 2px ${RarityColors[rarity]}`,
        transform: isFlipped && turnable ? "rotateY(180deg)" : "rotateY(0deg)",
        width: dimensions[size].width,
        height: dimensions[size].height,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="pointer-events-none absolute -left-2 -top-2 z-10 flex items-center justify-center"
        style={{
          width: dimensions[size].gem,
          height: dimensions[size].gem,
        }}
      >
        <Gem outerColor="rgb(255, 92, 92)" innerColor="rgb(252, 38, 38)" />
        <div
          className="absolute flex items-center justify-center  text-white"
          style={{
            opacity: isFlipped && turnable ? 0 : 1,
            fontSize: dimensions[size].gemFont,
          }}
        >
          {cost}
        </div>
      </div>
      <Image
        src={image}
        alt={name}
        width={dimensions[size].image}
        height={dimensions[size].image}
        style={{
          objectFit: "contain",
        }}
      />
      <div
        className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-2 rounded-b bg-black text-center font-bold"
        style={{
          transform:
            isFlipped && turnable ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div>
          <div
            className="  text-white"
            style={{
              fontSize: dimensions[size].font,
            }}
          >
            {name}
          </div>
          <div
            style={{
              color: RarityColors[rarity],
              fontSize: dimensions[size].font,
            }}
          >
            {type}
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 top-0 h-full w-full  items-center justify-center bg-black bg-opacity-50 p-4"
        style={{
          display: isFlipped && turnable ? "flex" : "none",
          transform:
            isFlipped && turnable ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute bottom-0 top-0 w-full bg-black bg-opacity-50"
          style={{
            filter: "blur(10px)",
          }}
        ></div>
        <div className="absolute bottom-0 right-1 z-10 text-center text-[1rem] text-white text-opacity-40">
          {id}
        </div>
        <div className="z-10 text-center text-[0.75rem] font-bold text-white lg:text-[0.85rem]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ChessCard;
