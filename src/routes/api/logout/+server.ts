import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteCookie } from '$lib/auth';

export const GET: RequestHandler = async ({ request, cookies }) => {
	deleteCookie(cookies.get('token') ?? '');

	cookies.delete('token', {
		path: '/'
	});

	return redirect(302, '/admin');
};
