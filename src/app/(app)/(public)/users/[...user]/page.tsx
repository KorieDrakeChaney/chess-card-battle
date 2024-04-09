import { GifCard, UserCard } from "@/components";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

const UserProfile = async ({ params }: { params: { user: string } }) => {
  const user = await api.users.getUserByUsername(params.user.toString());
  const session = await auth();
  return (
    <div className="flex flex-col items-center py-8">
      {user ? (
        <UserCard
          user={user}
          authenticated={session?.user?.email == user?.email}
        />
      ) : (
        <GifCard
          gif="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2xzbjFqaDZwZGk4Z3VxNm1wZ210OTB5bHB5eXRtcmlkMHZzZXNiZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uLnPIWsqIz2aA/giphy.gif"
          message="404 User not found"
        />
      )}
    </div>
  );
};

export default UserProfile;
