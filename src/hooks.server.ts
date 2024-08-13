import { isValidCookie } from '$lib/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (!token) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	event.locals.user = { connected: isValidCookie(token) };
	event.locals.session = { connected: isValidCookie(token) };
	return resolve(event);
};
