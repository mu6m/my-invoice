<script lang="ts">
	import { page } from '$app/stores';
	import axios from 'axios';
	import Feature from './Feature.svelte';

	export let i: any;
	export let inv: any;

	let features: any = [];
	inv[i] = {
		count: 1,
		features: []
	};

	async function update_feat() {
		let id = inv[i].id || $page.data.pro[0].id;
		const { data } = await axios.get(`/dashboard/invoice/create?id=${id}`);
		features = data;
	}
</script>

<h1>product {i}</h1>
<div class="mb-4">
	<label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Select a product</label
	>
	<select
		id="type"
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		bind:value={inv[i].id}
		on:input={update_feat}
	>
		{#each $page.data.pro as p}
			<option value={p.id}>{p.title}</option>
		{/each}
	</select>
	<div class="mb-4">
		<label class="block text-gray-700 text-sm font-bold mb-2" for="input">count</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="number"
			min="1"
			bind:value={inv[i].count}
		/>
	</div>
	<h1>features:</h1>
	{#await update_feat() then sad}
		<Feature {i} {inv} {features} />
	{/await}
</div>
