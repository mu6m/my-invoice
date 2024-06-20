import { json, error, redirect } from '@sveltejs/kit';
import { verify } from '$lib/models/auth/validators/account';
import { send_code } from '$lib/models/auth/db/email';
import prisma from '$lib/helpers/prisma';

export async function POST({ request, params }: any) {
	//should we implement rate limiting for admin dashboards?
	const body = await request.json();
	try {
		const parsed = await verify(body);
		if (!parsed.success) {
			return error(400, parsed.error.message);
		}
		const user = await prisma.user.findUnique({
			where: {
				email: body.email
			}
		});
		if (user) {
			return redirect(302, '/auth/login');
		}
		const sent = await send_code(body);
		if (!sent) {
			throw new Error('email not sent');
		}
	} catch (e) {
		return error(500);
	}

	return json({ message: 'code sent to email' });
}
