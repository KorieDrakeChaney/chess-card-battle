import { DeckEdit } from "@/components";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const DeckEditPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  const ownedCardsData = await api.users.getCurrentUserOwnedCards();
  const deck = await api.decks.getUnique(params.id.toString());

  if (session!.user?.id !== deck?.userId) {
    redirect("/decks");
  }

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
