<script>
	import 'tailwindcss/tailwind.css';
</script>

<svelte:head>
	<title>My Invoice</title>
</svelte:head>

<div>
	<main class="container mx-auto max-w-3xl my-10">
		<slot />
	</main>

	<footer></footer>
</div>
