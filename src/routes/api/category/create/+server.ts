import { create } from '$lib/models/category/db/create';
import { json, error, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }: any) {
	const body = await request.json();
	try {
		const token = await cookies.get('jwt');
		const category = await create(token, body);
		return json({ message: 'category created', category });
	} catch (e) {
		return error(500);
	}
}
