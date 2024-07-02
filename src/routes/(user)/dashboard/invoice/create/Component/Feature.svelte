<script lang="ts">
	import { page } from '$app/stores';

	export let i: any;
	export let inv: any;
	export let features: any;
	for (let index = 0; index < features.product_features.length; index++) {
		inv[i].features[index] = {
			product_featuresId: features.product_features[index].id,
			checked: false,
			typed: '',
			option_index: 0
		};
	}
</script>

{#if features.length == 0}
	<h1>Loading Feature</h1>
{/if}
<div class="mb-4">
	{#each features.product_features as feat, j}
		{#if feat.type == 'TEXT'}
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="title">{feat.name}</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="title"
					name="title"
					type="text"
					bind:value={inv[i].features[j].typed}
				/>
			</div>
		{/if}
		{#if feat.type == 'CHECKBOX'}
			<div class="flex items-center mb-4">
				<input
					id="published"
					type="checkbox"
					value=""
					bind:checked={inv[i].features[j].typed}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label for="published" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>{feat.name}</label
				>
			</div>
		{/if}
	{/each}
</div>
