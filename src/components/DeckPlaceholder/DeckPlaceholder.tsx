"use client";

import { api } from "@/trpc/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeckPlaceholder = () => {
  const mutation = api.users.createDeck.useMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!loading) {
      mutation.mutate();
      setLoading(true);
    }
  };

  useEffect(() => {
    if (mutation.data) {
      router.refresh();
      setLoading(false);
    }
  }, [mutation.data]);

  return (
    <div
      className="flex h-[240px] w-[180px] cursor-pointer flex-col items-center justify-center rounded border-4 px-1 py-2 transition-all hover:border-gray-200 hover:bg-white hover:bg-opacity-10"
      onClick={handleClick}
    >
      <div className="flex flex-grow items-center justify-center rounded ">
        <FaPlus className="text-4xl text-gray-400" />
      </div>
    </div>
  );
};

export default DeckPlaceholder;
