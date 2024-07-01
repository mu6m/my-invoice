import { edit } from '$lib/models/category/db/edit';
import { json, error, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }: any) {
	const body = await request.json();
	const token = await cookies.get('jwt');
	const category = await edit(token, body);
	return json({ message: 'category created', category });
}
