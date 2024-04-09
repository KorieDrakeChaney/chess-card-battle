import axios from "axios";
import { env } from "@/env";
import { api } from "@/trpc/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { message } = await (req.json() as Promise<{
    message: string;
  }>);

  const currentUser = await api.users.getCurrentUser();

  if (!currentUser) {
    return Response.json(null, { status: 401 });
  }

  try {
    const {
      data,
    }: {
      data: {
        data: Array<Array<string>>;
      };
    } = await axios.post(`${env.MINDSDB_URL}/api/sql/query`, {
      query: `SELECT answer
          FROM text_to_sql_agent
          WHERE question = "${message}"
          AND user = "${currentUser.username}";`,
    });

    if (!data?.data?.[0]?.[0]) {
      return Response.json(null, { status: 404 });
    }

    return Response.json(
      {
        data: data.data[0][0],
      },

      { status: 200 },
    );
  } catch (error) {
    return Response.json(null, { status: 500 });
  }
};
