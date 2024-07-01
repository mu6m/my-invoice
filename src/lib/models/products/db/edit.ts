import prisma from '$lib/helpers/prisma';
import { validate_type, user_type } from '$lib/helpers/validate_user';
import { is_feature, is_product } from '../validator/product';

export async function edit(product_id: string, token: string, body: any) {
	if (!validate_type(token, [user_type.ADMIN])) {
		throw new Error('user does not have the previlage');
	}
	const parsed_product = await is_product(body?.product);
	const parsed_feature = await is_feature(body?.feature);

	if (!parsed_product.success || !parsed_feature.success) {
		throw new Error(`your object has an error ${parsed_product.success} ${parsed_feature.success}`);
	}

	const product = await prisma.$transaction(async (tx) => {
		const product = await tx.product.update({
			where: {
				id: product_id
			},
			data: body.product
		});
		await tx.product_features.deleteMany({
			where: {
				productId: product_id
			}
		});
		for (let i = 0; i < body.feature.length; i++) {
			let feature = body.feature[i];
			feature.productId = product.id;
			await tx.product_features.create({ data: feature });
		}
		return product;
	});

	return product;
}
