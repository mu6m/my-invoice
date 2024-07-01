import prisma from '$lib/helpers/prisma';

export async function load({ locals, params }: any) {
	//we need to use locals to get the categories
	const cats = await prisma.category.findUnique({
		where: {
			id: params.edit
		}
	});
	return {
		cats
	};
}
