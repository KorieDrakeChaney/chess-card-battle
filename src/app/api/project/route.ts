import { api } from "@/trpc/server";

import axios from "axios";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const currentUser = await api.users.getCurrentUser();

  if (!currentUser) {
    return new Response(null, { status: 401 });
  }

  const access_token = await api.account.getAccessTokenFromId(currentUser.id);

  if (!access_token) {
    return new Response(null, { status: 401 });
  }

  try {
    const response = await axios.get(
      `https://api.github.com/user/starred/KorieDrakeChaney/chess-card-battle`,
      {
        headers: {
          Authorization: `token ${access_token.access_token}`,
        },
      },
    );

    return new Response(
      JSON.stringify({
        data: {
          isStarred: true,
        },
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
