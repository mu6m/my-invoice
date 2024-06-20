<script>
	import Sidebar from '$lib/Components/Sidebar.svelte';
	import '../../../app.css';
</script>

<svelte:head>
	<title>My Invoice | Dashboard</title>
</svelte:head>

<main class="container flex items-start flex-col md:flex-row gap-5">
	<Sidebar />
	<div class="mt-20 w-full">
		<slot />
	</div>
</main>
