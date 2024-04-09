import { Card } from "@prisma/client";
import Image from "next/image";
import { RarityColors } from "../utils";
import { Gem } from "@/icons";

interface CardDisplayProps {
  card: Card;
  children?: JSX.Element;
  size?: "small" | "medium" | "large";
  className?: string;
}

const CardDisplay = ({
  card,
  children,
  size = "medium",
  className,
}: CardDisplayProps) => {
  const { name, image, cost, rarity, type, tip, id } = card;

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
      className={
        className +
        " relative flex select-none  flex-col rounded transition-all hover:cursor-pointer"
      }
      style={{
        border: `solid 2px ${RarityColors[rarity]}`,
        width: dimensions[size].width,
        height: dimensions[size].height,
      }}
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
      <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-2 rounded-b bg-black text-center font-bold">
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
      {children}
    </div>
  );
};

export default CardDisplay;
