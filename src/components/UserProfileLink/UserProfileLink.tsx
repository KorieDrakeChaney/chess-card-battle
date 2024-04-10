"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxExternalLink } from "react-icons/rx";
import { signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbCards } from "react-icons/tb";
import { signIn } from "next-auth/react";
import { type GetCurrentUserOutput } from "@/client";

interface UserProfileLinkProps {
  user: GetCurrentUserOutput;
}

const UserProfileLink = ({ user }: UserProfileLinkProps) => {
  const [isClicked, setIsClicked] = useState(false);

  if (!user) {
    return (
      <div className=" flex h-full items-center">
        <div
          className="flex cursor-pointer gap-4 rounded-3xl border border-white px-4 py-2 font-bold text-white transition-all hover:bg-gray-100 hover:bg-opacity-50 active:bg-transparent"
          onClick={async () => {
            try {
              await signIn("github");
            } catch (_) {}
          }}
        >
          <FaGithub size={25} />
          <div className="hidden sm:inline">Sign In</div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="flex  items-center gap-2 p-2">
        <div
          className="hidden cursor-pointer text-white sm:inline"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          {user.username}
        </div>
        <Image
          src={user.image ?? "/avatar.png"}
          alt={user.name ?? "User avatar"}
          width={50}
          height={50}
          className="cursor-pointer border-2 "
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        />
      </div>
      <div
        className="absolute right-0 top-full  w-[150px] gap-1 rounded bg-white py-1 transition-all sm:w-[225px]"
        style={{
          display: isClicked ? "inline" : "none",
          opacity: isClicked ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 100,
        }}
      >
        <Link
          href={`/users/${user.username}`}
          className="flex w-full cursor-pointer items-center justify-between p-1 transition-all hover:bg-black hover:bg-opacity-10"
          onClick={() => setIsClicked(false)}
        >
          Profile
          <RxExternalLink size={20} />
        </Link>
        <Link
          href={"/decks"}
          className="flex w-full cursor-pointer items-center justify-between p-1 transition-all hover:bg-black hover:bg-opacity-10"
          onClick={() => setIsClicked(false)}
        >
          Decks
          <TbCards size={20} />
        </Link>
        <div
          className="flex w-full cursor-pointer items-center justify-between p-1 transition-all hover:bg-black hover:bg-opacity-10"
          onClick={async () => {
            await signOut();
            setIsClicked(false);
          }}
        >
          Sign out
          <IoIosLogOut size={20} />
        </div>
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 "
        onClick={() => setIsClicked(false)}
        style={{
          display: isClicked ? "inline" : "none",
          zIndex: 99,
        }}
      />
    </div>
  );
};

export default UserProfileLink;
