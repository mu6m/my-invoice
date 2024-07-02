import prisma from '$lib/helpers/prisma';

export async function load({ locals }: any) {
	//we need to use locals to get the categories
	const data = await prisma.product.findMany();
	return {
		pro: data
	};
}
