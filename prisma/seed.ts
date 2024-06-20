import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'jling0139@gmail.com',
			password: '$2b$10$ABiLUnDbV9nPR7slUaTxGugHBpfzCNTy6YyauTrGO603o.j5QvWR6',
			name: ['john'],
			type: 'ADMIN',
			username: 'admin'
		}
	});
	console.log(user);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
