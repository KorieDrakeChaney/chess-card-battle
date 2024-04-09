import { GifCard } from "@/components";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-dark to-green-dark py-8">
      <GifCard
        gif="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2xzbjFqaDZwZGk4Z3VxNm1wZ210OTB5bHB5eXRtcmlkMHZzZXNiZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uLnPIWsqIz2aA/giphy.gif"
        message="404 Page not found"
      />

      <Link
        href="/"
        className="mt-4 cursor-pointer rounded bg-green-light px-2 py-1 font-bold text-white hover:opacity-80 active:opacity-100"
      >
        Back to home
      </Link>
    </main>
  );
};

export default NotFoundPage;
