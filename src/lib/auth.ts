import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { Discord } from "arctic"

import { dev } from "$app/environment";
import { prisma } from "./prisma";
import { env } from "$env/dynamic/private";

const adapter = new PrismaAdapter(prisma.session, prisma.user);// your adapter

export const discord = new Discord(env.DISCORD_CLIENT_ID, env.DISCORD_CLIENT_SECRET, env.AUTH_CALLBACK)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      discord_id: attributes.discord_id,
      username: attributes.username
    }
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      discord_id: string;
      username: string;
    };
  }
}