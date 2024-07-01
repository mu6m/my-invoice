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

	//sum the products
	let merged: any = {};
	body.products.forEach((product: any) => {
		if (merged[product.id]) {
			merged[product.id].count += product.count;
			for (const item of product.features) {
				merged[product.id].features.add(item.product_featuresId);
			}
		} else {
			// Otherwise, initialize with the product
			merged[product.id] = {
				id: product.id,
				count: product.count,
				features: new Set()
			};
			for (const item of product.features) {
				merged[product.id].features.add(item.product_featuresId);
			}
		}
	});
	let db_pro = await prisma.product.findMany({
		where: {
			id: {
				in: Object.keys(merged)
			}
		},
		include: {
			product_features: true
		}
	});
	db_pro = db_pro.reduce((acc: any, obj) => {
		acc[obj.id] = obj;
		return acc;
	}, {});

	//simply check for limit and required
	for (const key in merged) {
		const item = merged[key];
		const pro = db_pro[key];
		if (pro.limit && item.count > pro.limit) {
			throw new Error('limit exceeded');
		}
		for (const feat of pro.product_features) {
			if (feat.required) {
				if (!item.features.has(feat.id)) {
					throw new Error('some features are required');
				}
			}
		}
	}
	//format the features
	let inv_arr: any[] = [];
	for (let item of body.products) {
		for (let feat of item.features) {
			let op_feat: any = undefined;
			for (const pro_feat of db_pro[item.id].product_features) {
				if (pro_feat.id == feat.product_featuresId) {
					op_feat = pro_feat;
				}
			}
			if (feat.type == 'OPTION') {
				feat.option = op_feat.option[feat.option_index];
				feat.price = op_feat.price_add_options[feat.option_index];
			} else {
				feat.price = op_feat.price_add;
			}
			delete feat.option_index;
			// delete feat.product_featuresId;
			inv_arr.push({
				product: item.id,
				count: item.count,
				features: item.features
			});
		}
	}
	//read many
	//update many
	await prisma.$transaction(
		async (tx) => {
			for (const key in merged) {
				await tx.product.update({
					where: {
						id: merged[key].id
					},
					data: {
						limit: {
							decrement: merged[key].count
						}
					}
				});
			}
			//create invoice
			console.log('long transaction');

			const invo = await tx.invoice.create({
				data: {
					user: {
						connect: { id: user.id }
					}
				}
			});

			for (let pro_i of inv_arr) {
				console.log(pro_i);
				await tx.invoiceAndProducts.create({
					data: {
						invoiceId: invo.id,
						productId: pro_i.product,
						count: pro_i.count,
						features: {
							createMany: {
								data: pro_i.features
							}
						}
					}
				});
			}
		},
		{
			maxWait: 100000,
			timeout: 100000,
			isolationLevel: Prisma.TransactionIsolationLevel.Serializable
		}
	);

	return true;
}
