export const actions = {
	edit: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
	}
};
