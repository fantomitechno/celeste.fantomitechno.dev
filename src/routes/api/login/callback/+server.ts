import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { discord, lucia } from "$lib/auth";
import { prisma } from "$lib/prisma";
import { generateId } from "lucia";
import { OAuth2RequestError } from "arctic";

export const GET: RequestHandler = async ({ request, cookies }) => {
  const stateCookie = cookies.get("discord_oauth_state") ?? null;

  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!state || !stateCookie || !code || stateCookie !== state) {
    return error(400);
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);

    const discordUserResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const discordUser: DiscordUserResult = await discordUserResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        discord_id: discordUser.id
      }
    })

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const userId = generateId(15);
      await prisma.user.create({
        data: {
          id: userId,
          username: discordUser.username,
          discord_id: discordUser.id
        }
      })

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(userId);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      // bad verification code, invalid credentials, etc
      return error(400);
    }
    return error(500);
  }

  return redirect(302, "/admin");
};

interface DiscordUserResult {
  id: string,
  username: string
}