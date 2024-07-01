import { edit } from '$lib/models/products/db/edit';
import { json, error, redirect } from '@sveltejs/kit';

export async function POST({ request, params, cookies }: any) {
	let body = await request.json();
	const id = body.id;
	delete body['id'];
	const token = await cookies.get('jwt');
	const product = await edit(id, token, body);
	return json({ message: 'product edited', product });
}
