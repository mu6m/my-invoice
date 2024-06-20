import { create } from '$lib/models/products/db/create';
import { json, error, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }: any) {
	try {
		const body = await request.json();
		const token = await cookies.get('jwt');
		const product = await create(token, body);
		return json({ message: 'product created', product });
	} catch (e) {
		return error(500);
	}
}
