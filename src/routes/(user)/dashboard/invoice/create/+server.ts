import prisma from '$lib/helpers/prisma';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }: any) {
	let id = url.searchParams.get('id');
	const data = await prisma.product.findFirst({
		where: {
			id
		},
		include: {
			product_features: true
		}
	});
	return json(data);
}
