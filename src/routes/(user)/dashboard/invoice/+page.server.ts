import prisma from '$lib/helpers/prisma';
import { fail } from '@sveltejs/kit';

const per_page = 10;
export async function load({ locals, params, url }: any) {
	let page = parseInt(url.searchParams.get('page'));
	let search_text = url.searchParams.get('q') || '';
	if (!page) {
		page = 1;
	}
	// const all_sell = await prisma.$queryRaw``
	const list = await prisma.invoice.findMany({
		where: {
			products: {
				every: {
					product: {
						title: search_text
					}
				}
			}
		},
		skip: (page - 1) * per_page,
		take: per_page,
		include: {
			products: {
				include: {
					product: true,
					features: true
				}
			}
		},
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});
	const count = await prisma.product.count();
	return {
		list,
		count,
		per_page,
		page
	};
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		console.log(id);
		if (!id) {
			return fail(400);
		}
		const res = await prisma.invoice.delete({
			where: {
				id
			}
		});
		return res;
	}
};
