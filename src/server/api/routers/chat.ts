import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";
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

      const data: {
        data: {
          data: string[][];
        };
      } = await axios.post(`${env.MINDSDB_URL}/api/sql/query`, {
        query: `SELECT answer
            FROM text_to_sql_agent
            WHERE question = "${input}"
            AND user = "${user.username}";`,
      });

      if (!data?.data?.data?.[0]?.[0]) {
        return null;
      }

      return data.data.data[0][0];
    }),
});
