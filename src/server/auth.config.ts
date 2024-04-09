import GitHub, { type GitHubProfile } from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    GitHub({
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/auth-error",
  },
} satisfies NextAuthConfig;
