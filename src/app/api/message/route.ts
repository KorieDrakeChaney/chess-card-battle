import axios from "axios";
import { env } from "@/env";
import { api } from "@/trpc/server";
import { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const { message } = await req.json();

  const currentUser = await api.users.getCurrentUser();

  if (!currentUser) {
    return Response.json(null, { status: 401 });
  }

  try {
    const { data } = await axios.post(`${env.MINDSDB_URL}/api/sql/query`, {
      query: `SELECT answer
          FROM text_to_sql_agent
          WHERE question = "${message}"
          AND user = "${currentUser.username}";`,
    });

    const parsedData = z
      .object({
        data: z.array(z.array(z.string())),
      })
      .parse(data);

    if (!parsedData?.data?.[0]?.[0]) {
      return Response.json(null, { status: 404 });
    }

    return Response.json(
      {
        data: parsedData.data[0][0],
      },

      { status: 200 },
    );
  } catch (error) {
    return Response.json(null, { status: 500 });
  }
};
