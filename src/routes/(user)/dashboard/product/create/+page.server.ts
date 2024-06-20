import prisma from '$lib/helpers/prisma';

export async function load({ locals }: any) {
	//we need to use locals to get the categories
	const data = await prisma.category.findMany();
	return {
		cats: data
	};
}
