import { generateState } from "arctic";
import type { RequestHandler } from "./$types";
import { discord } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const GET: RequestHandler = async ({ cookies }) => {
  const state = generateState();
  const url = await discord.createAuthorizationURL(state, {
    scopes: ["identify"]
  });

  cookies.set("discord_oauth_state", state, {
    httpOnly: true,
    secure: !dev, // set `Secure` flag in HTTPS
    maxAge: 60 * 10, // 10 minutes
    path: "/"
  })

  return redirect(302, url)
};