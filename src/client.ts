import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/api/root";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type GetUserByUsernameInput = RouterInput["users"]["getUserByUsername"];
export type GetUserByUsernameOutput =
  RouterOutput["users"]["getUserByUsername"];

export type GetCurrentUserOutput = RouterOutput["users"]["getCurrentUser"];
export type GetCurrentUserInput = RouterInput["users"]["getCurrentUser"];
