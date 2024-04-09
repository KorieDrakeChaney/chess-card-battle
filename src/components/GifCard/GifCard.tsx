import Image from "next/image";

interface GifCardProps {
  gif: string;
  message: string;
}

const GifCard = ({ gif, message }: GifCardProps) => {
  return (
    <div className="flex w-[90%] flex-col items-center gap-4 rounded bg-green-dark p-8 shadow-md sm:w-[640px]">
      <div className=" border-opacity-75 text-white 2xs:text-[1.25rem] xs:text-[1.5rem] sm:text-[2rem]">
        {message}
      </div>
      <div className="relative aspect-square w-[100%] sm:h-[400px]">
        <Image src={gif} fill alt={message} unoptimized />
      </div>
    </div>
  );
};

export default GifCard;
