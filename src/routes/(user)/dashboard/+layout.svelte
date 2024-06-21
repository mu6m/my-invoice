<script>
	import Sidebar from '$lib/Components/Sidebar.svelte';
	import 'tailwindcss/tailwind.css';
</script>

<svelte:head>
	<title>My Invoice | Dashboard</title>
</svelte:head>

<Sidebar />
<main>
	<div class="flex flex-col items-center justify-center w-full mt-8">
		<slot />
	</div>
</main>
