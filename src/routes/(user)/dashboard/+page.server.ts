import prisma from '$lib/helpers/prisma';

export async function load({ locals, params }: any) {
	const p_count = await prisma.product.count();
	const inv_count = await prisma.invoice.count();
	return {
		p_count,
		inv_count
	};
}
