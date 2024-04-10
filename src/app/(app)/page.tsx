import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center p-4 text-center text-white sm:p-8">
      <div className="w-[250px] text-center text-[1.5rem] font-bold xs:w-[300px] xs:text-[1.75rem] sm:w-[480px] sm:text-[2.5rem] md:w-[650px] md:text-[3rem]">
        Things to do while we wait for the exciting game to{" "}
        <span className="text-pink-light">release!</span>
      </div>

      <div className="flex w-[240px] flex-col gap-8 text-left text-[1.125rem] xs:w-[270px] sm:w-[400px] sm:text-[1.25rem] md:w-[500px] md:text-[1.5rem]">
        <div className="flex items-center gap-2 even:flex-row-reverse ">
          <span className="text-[2rem] text-gray-300 xs:text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem]">
            1.
          </span>
          <div className="mt-16">
            Check out the{" "}
            <Link
              href="/gallery"
              className="cursor-pointer text-pink-dark hover:underline"
            >
              gallery
            </Link>{" "}
            to see the all the amazing cards.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="mt-5">
            Talk to the Chess Card Battle Assistant to learn more about the
            game!
          </div>
          <span className="text-[2rem] text-gray-300 xs:text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem]">
            2.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[2rem] text-gray-300 xs:text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem]">
            3.
          </span>
          <div className="mt-5">
            Create a{" "}
            <Link
              href="/decks"
              className="cursor-pointer text-pink-dark hover:underline"
            >
              deck
            </Link>{" "}
            to prepare for the upcoming battles!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
