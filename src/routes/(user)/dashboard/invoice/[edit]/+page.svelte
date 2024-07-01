<script lang="ts">
	import { page } from '$app/stores';
	import Feature from '$lib/Components/Feature.svelte';
	import axios from 'axios';

	let loading = false;
	let errors: string[] = [];
	let images = $page.data.pro.images.length;
	let feature = $page.data.pro.product_features.length;
	let feature_arr: any[] = $page.data.pro.product_features;

	let product_obj = {
		title: $page.data.pro.title,
		content: $page.data.pro.content,
		sku: $page.data.pro.sku,
		images: $page.data.pro.images,
		limit: $page.data.pro.limit,
		categoryId: $page.data.pro.categoryId || undefined,
		published: $page.data.pro.published,
		pos: $page.data.pro.pos
	};

	let alert: string = '';
	async function submit_api() {
		console.log({
			id: $page.params.edit,
			product: product_obj,
			feature: feature_arr
		});
		const { data, status } = await axios.post(
			'/api/product/edit',
			{
				id: $page.params.edit,
				product: product_obj,
				feature: feature_arr
			},
			{
				validateStatus: () => true
			}
		);
		if (status === 200) {
			alert = `product <b>${product_obj.title}</b> edited successfully !`;
		} else {
			alert = 'there is an error !';
		}
	}
</script>

{#if alert !== ''}
	<div
		class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md my-10"
		role="alert"
	>
		<div class="flex">
			<div class="py-1">
				<svg
					class="fill-current h-6 w-6 text-teal-500 mr-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
					/></svg
				>
			</div>
			<div>
				<p class="text-sm">{@html alert}</p>
			</div>
		</div>
	</div>
{/if}

<form
	class="bg-white shadow-md rounded px-3 w-full max-w-3xl pt-6 pb-8 mb-4"
	on:submit|preventDefault={async () => {
		loading = true;
		errors = [];
		await submit_api();
		loading = false;
	}}
>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="title">title</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="title"
			name="title"
			type="text"
			placeholder="title"
			bind:value={product_obj.title}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="content"
			>content (optional)</label
		>
		<textarea
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="content"
			name="content"
			placeholder="content"
			rows="10"
			bind:value={product_obj.content}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="sku">sku (optional)</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="sku"
			name="sku"
			type="text"
			placeholder="sku"
			bind:value={product_obj.sku}
		/>
	</div>
	<div class="mb-4">
		<label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Select a category</label
		>
		<select
			id="type"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			bind:value={product_obj.categoryId}
		>
			<option selected value={undefined}>Choose Category (optional)</option>
			{#each $page.data.cats as cat}
				<option value={cat.id}>{cat.name}</option>
			{/each}
		</select>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="sku">number of images</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="numof"
			name="numof"
			type="number"
			min="0"
			bind:value={images}
		/>
	</div>
	<h2 class="font-bold my-5">images:</h2>
	{#each { length: images } as _, i}
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for={`image-${i}`}>image {i}</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id={`image-${i}`}
				name={`image-${i}`}
				type="text"
				placeholder={`image ${i}`}
				bind:value={product_obj.images[i]}
			/>
		</div>
	{/each}

	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="sku"
			>limit (leave empty to make it unlimited)</label
		>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="limit"
			name="limit"
			type="number"
			min="0"
			placeholder="limit"
			bind:value={product_obj.limit}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="sku">number of features</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			id="numof"
			name="numof"
			type="number"
			min="0"
			bind:value={feature}
		/>
	</div>
	<h2 class="font-bold my-5">product features:</h2>
	{#each { length: feature } as _, i}
		<Feature {i} {feature_arr} />
	{/each}

	<div class="flex items-center mb-4">
		<input
			id="published"
			type="checkbox"
			value=""
			bind:checked={product_obj.published}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
		/>
		<label for="published" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
			>is published</label
		>
	</div>
	<div class="flex items-center mb-4">
		<input
			id="pos"
			type="checkbox"
			value=""
			bind:checked={product_obj.pos}
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
		/>
		<label for="pos" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">is pos</label
		>
	</div>
	<div class="flex items-center justify-between">
		{#if !loading}
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Update
			</button>
		{:else}
			<div role="status">
				<svg
					aria-hidden="true"
					class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span class="sr-only">Loading...</span>
			</div>
		{/if}
	</div>
</form>
