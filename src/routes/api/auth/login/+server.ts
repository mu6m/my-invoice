import { json, error, redirect } from '@sveltejs/kit';
import { login_account } from '$lib/models/auth/db/login';
import { JWT_SECRET } from '$env/static/private';

export async function POST({ request, params, cookies }: any) {
	const body = await request.json();
	try {
		const token = await login_account(body);
		await cookies.set('jwt', token, {
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			secure: JWT_SECRET,
			maxAge: 60 * 60 * 24 * 30
		});
		return json({ message: 'logged in', token });
	} catch (e) {
		return error(500);
	}
}
