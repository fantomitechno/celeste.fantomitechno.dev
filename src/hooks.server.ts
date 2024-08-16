import { isValidCookie } from '$lib/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	event.locals.connected = isValidCookie(token ?? '');
	return resolve(event);
};
