<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Paginate from '$lib/Components/Paginate.svelte';

	function simple_date(date_str: string) {
		const date = new Date(date_str);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}/${month}/${day}`;
	}
	console.log($page.data);
	let search_t = '';
	let to_delete = '';
	let pop_del: any = undefined;
</script>

<div class="flex gap-3">
	<div class="flex">
		<input type="text" bind:value={search_t} placeholder="search by title" />
		<button
			class="btn btn-primary"
			on:click={() => {
				let query = new URLSearchParams($page.url.searchParams.toString());

				query.set('q', search_t);

				goto(`?${query.toString()}`);
			}}>search</button
		>
	</div>
	<a href="/dashboard/product/create" class="btn btn-success">Create New Product</a>
</div>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th></th>
				<th>number of products</th>
				<th>price</th>
				<th>created At</th>
				<th>updated At</th>
				<th>actions</th>
			</tr>
		</thead>
		<tbody>
			{#if $page.data.list.length == 0}
				<h1>No Products</h1>
			{/if}
			{#each $page.data.list as product, index}
				<tr>
					<th>{index + 1}</th>
					<td>{product.title}</td>
					<td>{product.sku}</td>
					<td>{product.limit || 'NO LIMIT'}</td>
					<td>{product.pos}</td>
					<td>{product.published}</td>
					<td>{simple_date(product.createdAt)}</td>
					<td>{simple_date(product.updatedAt)}</td>
					<td>{product?.category?.name || 'NO CATEGORY'}</td>
					<td>
						<a href={`/dashboard/product/${product.id}`} class="btn btn-primary">Edit</a>
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<label
							for="my_modal"
							class="btn btn-error"
							on:click={() => {
								to_delete = product.id;
							}}>Delete</label
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<input type="checkbox" id="my_modal" class="modal-toggle" bind:this={pop_del} />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h1>Are You Sure?</h1>
		<form method="POST" action="?/delete" use:enhance>
			<input value={to_delete} type="text" name="id" hidden={true} />
			<button
				class="btn btn-error"
				type="submit"
				on:click={() => {
					pop_del.checked = false;
				}}>Yes</button
			>
		</form>
	</div>
	<label class="modal-backdrop" for="my_modal">Close</label>
</div>
<Paginate max_count={$page.data.count} cur_page={$page.data.page} per_page={$page.data.per_page} />
