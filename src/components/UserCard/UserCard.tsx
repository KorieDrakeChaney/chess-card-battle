"use client";

import { type GetUserByUsernameOutput } from "@/client";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineEnter } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/trpc/react";

interface UserCardProps {
  user: GetUserByUsernameOutput;
  authenticated: boolean;
}

const UserCard = ({ user, authenticated }: UserCardProps) => {
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user?.bio ?? "");
  const edit_mutation = api.users.updateBio.useMutation();

  if (!user) {
    return null;
  }

  const handleEditEnter = () => {
    if (bio !== user.bio) {
      edit_mutation.mutate(bio);
    }
    setEditMode(false);
  };

  return (
    <div className="flex w-[90%] flex-col justify-center gap-4 rounded  bg-green-dark px-8  py-4 shadow-md sm:w-[600px] md:w-[750px] lg:w-[1000px]">
      <div className="flex flex-col items-center gap-4 2xs:flex-row 2xs:items-start">
        <div className="relative aspect-square h-[80px] 2xs:h-full">
          <Image
            src={user.image ?? "/avatar.png"}
            alt={user.name ?? "User avatar"}
            width={200}
            height={200}
          />
        </div>
        <div className="flex w-full flex-col gap-1 ">
          <div className=" font-bold text-white xs:text-[1.25rem] sm:text-[1.35rem] md:text-[1.5rem]">
            {user.username}
          </div>
          <div className="hidden text-gray-100 xs:inline">{user.name}</div>

          <div className="flex items-center gap-2 text-gray-100">
            {editMode ? (
              <input
                type="text"
                value={bio}
                size={0}
                placeholder="Enter a status here"
                className=" border-gray-100 text-[0.75rem] text-white outline-none sm:text-[1rem]"
                disabled={!editMode}
                style={{
                  width: "100%",
                  backgroundColor: "#1a354a",
                  borderBottomColor: "#9CA3AF",
                  borderBottom: "1px solid",
                }}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setBio(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditEnter();
                  }
                }}
              />
            ) : (
              <div className="text-[0.75rem] sm:text-[1rem]">
                {bio.length > 0 ? (
                  bio
                ) : (
                  <div className="text-gray-400">Enter a status here</div>
                )}
              </div>
            )}
            {authenticated && (
              <>
                {editMode ? (
                  <div className="flex justify-end gap-2 text-[0.75rem] sm:text-[1rem]">
                    <div
                      className="flex cursor-pointer items-center gap-1 opacity-50 hover:opacity-100"
                      onClick={handleEditEnter}
                    >
                      {50 - bio.length}{" "}
                      <div className="text-gray-300">
                        <AiOutlineEnter />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer text-[0.75rem] opacity-50 hover:opacity-100 sm:text-[1rem] "
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <FaRegEdit />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
