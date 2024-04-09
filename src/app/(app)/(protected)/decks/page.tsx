import { Deck, DeckPlaceholder } from "@/components";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

const DeckPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const deckData = await api.users.getDecks(session.user.id!);

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full text-center text-[3rem] font-bold text-pink-light">
        Decks
      </div>

      <div className="grid grid-flow-row grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-2  md:grid-cols-3">
        {deckData?.decks.map((deck) => (
          <Deck key={deck.id} id={deck.id} name={deck.name} />
        ))}
        {deckData?.decks.length ? (
          <>{deckData.decks.length < 3 && <DeckPlaceholder />}</>
        ) : (
          <DeckPlaceholder />
        )}
      </div>
    </div>
  );
};

export default DeckPage;
