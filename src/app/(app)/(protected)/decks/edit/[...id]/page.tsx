import { DeckEdit } from "@/components";
import { api } from "@/trpc/server";

const DeckEditPage = async ({ params }: { params: { id: string } }) => {
  const ownedCardsData = await api.users.getCurrentUserOwnedCards();
  const deck = await api.decks.getUnique(params.id.toString());

  return (
    <div className="flex h-full flex-grow">
      {ownedCardsData && deck && (
        <DeckEdit
          id={deck.id}
          name={deck.name}
          ownedCards={ownedCardsData.ownedCards}
        />
      )}
    </div>
  );
};

export default DeckEditPage;
