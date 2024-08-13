import { randomUUID } from 'crypto';
import { Discord } from 'arctic';

import { env } from '$env/dynamic/private';

const cookies = new Map<string, number>();

export const discord = new Discord(
	env.DISCORD_CLIENT_ID,
	env.DISCORD_CLIENT_SECRET,
	env.AUTH_CALLBACK
);

const isValidCookie = (cookie: string) => {
	clearCookies();
	const expiration = cookies.get(cookie) ?? 0;
	return expiration > Date.now();
};

const createCookie = () => {
	const uuid = randomUUID();
	cookies.set(uuid, Date.now() + 20 * 60 * 1000);
	return uuid;
};

const deleteCookie = (cookie: string) => {
	return cookies.delete(cookie);
};

const clearCookies = () => {
	let cleared = 0;
	for (const [cookie, expiration] of cookies.entries()) {
		if (expiration < Date.now()) {
			cookies.delete(cookie);
			cleared++;
		}
	}
	return cleared;
};

export { isValidCookie, createCookie, deleteCookie, clearCookies };
