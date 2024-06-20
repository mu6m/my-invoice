import { create } from '$lib/models/invoice/db/create';
import { json, error, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }: any) {
	const body = await request.json();
	const token = await cookies.get('jwt');
	const invoice = await create(token, body);
	return json({ message: 'invoice created', invoice });
	// try {
	// } catch (e) {
	// 	return error(500);
	// }
}
