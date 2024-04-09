"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { HiOutlineExclamation } from "react-icons/hi";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const ErrorCard = () => {
  return (
    <div
      className={
        poppins.className +
        " flex h-[240px] w-[90%] flex-col items-center justify-between  gap-4 rounded-md bg-white p-8 shadow xs:w-[465px]"
      }
    >
      <div className="flex flex-col items-center gap-1">
        <div className="text-[2rem]">
          <HiOutlineExclamation className="text-red-500" />
        </div>
        <div className="text-center xs:text-[1.25rem]">
          Error while authenticating
        </div>
      </div>
      <Link
        className="flex cursor-pointer gap-1 text-green-light hover:opacity-80"
        href={"/signin"}
      >
        Back to <div>Sign In</div>
      </Link>
    </div>
  );
};

export default ErrorCard;
