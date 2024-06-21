<script lang="ts">
	import axios from 'axios';

	let loading = false;
	let error = false;
	let alert: string[] = [];
	let submit_obj = {
		name: ''
	};
	async function submit(e: any) {
		const { data, status } = await axios.post('/api/category/create', submit_obj, {
			validateStatus: () => true
		});
		if (status === 200) {
			error = false;
			alert = [`category <b>${submit_obj.name}</b> created successfully`];
			e.target.reset();
		} else {
			error = true;
			alert = ['there is an error !'];
		}
	}
</script>

{#each alert as i}
	<div role="alert" class={`alert alert-${error ? 'error' : 'success'}`}>
		<span>{@html i}</span>
	</div>
{/each}
<form
	on:submit|preventDefault={async (e) => {
		loading = true;
		await submit(e);
		loading = false;
	}}
	class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4"
>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">category name</span>
		</div>
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
			bind:value={submit_obj.name}
		/>
	</label>

	{#if loading}
		<button class="btn">
			<span class="loading loading-spinner"></span>
			loading
		</button>
	{:else}
		<button type="submit" class="btn btn-active btn-primary">create</button>
	{/if}
</form>
