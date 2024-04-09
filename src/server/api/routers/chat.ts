import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios, { AxiosResponse } from "axios";
import { headers } from "next/headers";
import { z } from "zod";

export const chatRouter = createTRPCRouter({
  getReponse: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        return null;
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          username: true,
        },
      });

      if (!user) {
        return null;
      }

      try {
        const response: AxiosResponse<{
          data: string[][];
        }> = await axios.post(`${env.MINDSDB_URL}/api/sql/query`, {
          query: `SELECT answer
          FROM text_to_sql_agent
          WHERE question = "${input}"
          AND user = "${user.username}";`,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const { data } = response.data;

        if (!data?.[0]?.[0]) {
          return null;
        }

        return data[0][0];
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
});
