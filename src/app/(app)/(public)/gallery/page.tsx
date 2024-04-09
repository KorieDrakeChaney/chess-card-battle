import { api } from "@/trpc/server";
import { ChessCard } from "@/components";

const CardGallery = async () => {
  const cards = await api.cards.getAll();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full text-center text-[3rem] font-bold text-pink-light">
        Gallery
      </div>
      <div className=" grid grid-cols-1 items-center justify-center  gap-12 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <ChessCard
            key={card.id}
            id={card.id}
            name={card.name}
            image={card.image}
            description={card.description}
            cost={card.cost}
            rarity={card.rarity}
            type={card.type}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGallery;
