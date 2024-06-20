import { json, error, redirect } from '@sveltejs/kit';
import { create } from '$lib/models/auth/validators/account';
import { create_account } from '$lib/models/auth/db/register';
import prisma from '$lib/helpers/prisma';

export async function POST({ request, params }: any) {
	const body = await request.json();
	try {
		const parsed = await create(body);
		if (!parsed.success) {
			return error(400, parsed.error.message);
		}

		const user = await prisma.user.findUnique({
			where: {
				username: body.username
			}
		});
		if (user) {
			return redirect(302, '/auth/login');
		}

		const token = await create_account(body);
		return json({ message: 'account created', token });
	} catch (e) {
		return error(500);
	}
}
