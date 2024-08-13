import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createCookie, discord } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ request, cookies }) => {
	const stateCookie = cookies.get('discord_oauth_state') ?? null;

	const url = new URL(request.url);
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!state || !stateCookie || !code || stateCookie !== state) {
		return error(400);
	}

	try {
		const tokens = await discord.validateAuthorizationCode(code);

		const discordUserResponse = await fetch('https://discord.com/api/v10/users/@me', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const discordUser: DiscordUserResult = await discordUserResponse.json();

		if (discordUser.id !== env.ADMIN_ID) {
			return redirect(302, '/');
		}

		cookies.set('token', createCookie(), {
			path: '/'
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return error(400);
		}
		return error(500);
	}

	return redirect(302, '/admin');
};

interface DiscordUserResult {
	id: string;
}
