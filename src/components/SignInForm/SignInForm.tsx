"use client";

import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const SignInForm = () => {
  return (
    <div
      className={
        poppins.className +
        " flex h-[240px] w-[90%] flex-col items-center justify-between gap-4 rounded-md bg-white p-8 shadow xs:w-[465px]"
      }
    >
      <div className="flex flex-col items-center">
        <div className="text-[2rem]  font-bold text-blue-dark">Welcome</div>

        <div className="text-center text-[1.25rem] text-gray-500">
          Sign up with Github
        </div>
      </div>

      <div
        className="flex w-full cursor-pointer items-center gap-2 rounded border border-black px-4 py-2 hover:opacity-80 active:bg-gray-100 active:opacity-100"
        onClick={async () => {
          try {
            await signIn("github");
          } catch (_) {}
        }}
      >
        <FaGithub size={25} />
        Authenticate
      </div>
    </div>
  );
};

export default SignInForm;
