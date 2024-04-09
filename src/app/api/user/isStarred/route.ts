import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import axios from "axios";

export const GET = async () => {
  const session = await auth();

  if (!session) {
    return new Response(null, { status: 401 });
  }

  const account = await api.account.getAccessTokenFromId(session.user?.id!);

  if (!account) {
    return new Response(null, { status: 401 });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/user/starred/KorieDrakeChaney/chess-card-battle`,
      {
        headers: {
          Authorization: `token ${account.access_token}`,
        },
      },
    );

    return new Response(
      JSON.stringify({
        isStarred: response.status === 204,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        isStarred: false,
      }),
      {
        status: 200,
      },
    );
  }
};
