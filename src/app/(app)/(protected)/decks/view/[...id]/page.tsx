const DeckPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full text-center text-[3rem] font-bold text-pink-light">
        Decks
      </div>
    </div>
  );
};

export default DeckPage;
