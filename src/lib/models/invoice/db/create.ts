import { verifyAccessToken } from '$lib/helpers/jwt';
import prisma from '$lib/helpers/prisma';
import { validate_type, user_type } from '$lib/helpers/validate_user';
import { Prisma } from '@prisma/client';
import { is_invoice } from '../validator/validate';

export async function create(token: string, body: any) {
	if (!validate_type(token, [user_type.ADMIN, user_type.CUSTOMER, user_type.EMPLOYEE])) {
		throw new Error('user does not have the previlage');
	}
	const user = await verifyAccessToken(token);

	const parsed = await is_invoice(body);
	if (!parsed.success) {
		throw new Error('your object has an error');
	}

	const invoice = await prisma.$transaction(async (tx) => {
		const invoice = await tx.invoice.create({
			data: {
				userId: user.id
			}
		});
		let cart_sum: any = {};
		let db_products: any = {};
		for (const item of body.products) {
			if (!(item.id in cart_sum)) {
				cart_sum[item.id] = item.count;
				db_products[item.id] = await tx.product.findUnique({
					where: {
						id: item.id
					},
					include: {
						product_features: true
					}
				});
			} else {
				cart_sum[item.id] += item.count;
			}
		}

		for (const key in cart_sum) {
			if (db_products[key].limit) {
				if (cart_sum[key] > db_products[key].limit) {
					throw new Error('limit exceeded');
				}
				await tx.product.update({
					where: {
						id: key
					},
					data: {
						limit: {
							decrement: cart_sum[key]
						}
					}
				});
			}
		}
		for (let item of body.products) {
			//edit the price while checking the required
			let req_fet: any = {};
			for (const feat of db_products[item.id].product_features) {
				if (feat.required) {
					req_fet[feat.id] = true;
				}
			}
			for (let feat of item.features) {
				delete req_fet[feat.product_featuresId];
				const db_feat = db_products[item.id].product_features.find(
					(item: any) => item.id === feat.product_featuresId
				);
				console.log(db_feat);
				if (db_feat.type == 'OPTION') {
					feat['option'] = db_feat.option[feat.option_index];
					feat['price'] = db_feat.price_add_options[feat.option_index];
				} else {
					feat['price'] = db_feat.price_add;
				}
				delete feat['option_index'];
			}
			if (Object.keys(req_fet).length > 0) {
				throw new Error('some features are required');
			}
			const inv = await tx.invoiceAndProducts.create({
				data: {
					invoiceId: invoice.id,
					productId: item.id,
					count: item.count,
					features: {
						createMany: {
							data: item.features
						}
					}
				}
			});
			console.log(inv);
		}
		return;
	});

	return;
}
