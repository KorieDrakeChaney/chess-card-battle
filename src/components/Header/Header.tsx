import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import UserProfileLink from "../UserProfileLink/UserProfileLink";
const Header = async () => {
  const user = await api.users.getCurrentUser();

  return (
    <div className="flex h-[80px] justify-between border-b bg-green-dark px-4 py-2">
      <Link
        className="flex cursor-pointer items-center gap-2 text-[0.75rem] font-bold uppercase text-white sm:text-[1rem]"
        href={"/"}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className=" rounded-full"
          priority
        />
        Chess Card Battle!
      </Link>
      <UserProfileLink user={user} />
    </div>
  );
};

export default Header;
