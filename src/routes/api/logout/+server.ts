import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createCookie, discord } from '$lib/auth';
import { OAuth2RequestError } from 'arctic';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ request, cookies }) => {
	cookies.delete('token', {
		path: '/'
	});

	return redirect(302, '/admin');
};
