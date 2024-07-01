import prisma from '$lib/helpers/prisma';

export async function load({ locals, params }: any) {
	//we need to use locals to get the categories
	const data = await prisma.category.findMany();
	const pro = await prisma.product.findUnique({
		where: {
			id: params.edit
		},
		include: {
			product_features: true,
			category: true
		}
	});
	return {
		cats: data,
		pro
	};
}
