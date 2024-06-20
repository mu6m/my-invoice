import { verifyAccessToken } from '$lib/helpers/jwt';
import prisma from '$lib/helpers/prisma';
import { validate_type, user_type } from '$lib/helpers/validate_user';
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
		for (const product of body.products) {
			await tx.invoiceAndProducts.create({
				data: {
					invoiceId: invoice.id,
					productId: product.id,
					count: product.count,
					features: {
						createMany: {
							data: product.features
						}
					}
				}
			});
		}
		return invoice;
	});

	return invoice;
}
