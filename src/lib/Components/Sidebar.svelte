<script>
	import { page } from '$app/stores';
	let open = false;
	let dropdownOpen = false;

	function toggleMenu() {
		open = !open;
	}

	function closeMenu() {
		open = false;
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}
</script>

<div class="flex-1 md:flex flex-col md:flex-row w-full">
	<div class="flex flex-col w-full md:w-64 min-h-screen bg-zinc-100 text-gray-700 flex-shrink-0">
		<div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
			<button
				class="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
				on:click={toggleMenu}
			>
				<svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
					{#if !open}
						<path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
							clip-rule="evenodd"
						></path>
					{:else}
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					{/if}
				</svg>
			</button>
		</div>
		<nav
			class={`flex-grow ${open ? 'block' : 'hidden'} md:block px-4 pb-4 md:pb-0 md:overflow-y-auto`}
		>
			<h2 class="font-semibold">welcome {$page.data.user.name.join(' ')}</h2>
			<a
				class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
				href="/dashboard/invoice/create">Invoices</a
			>
			<div class="relative">
				<button
					on:click={toggleDropdown}
					class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark:bg-transparent dark:focus:text-white dark:hover:text-white dark:focus:bg-gray-600 dark:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
				>
					<span>products</span>
					<svg
						fill="currentColor"
						viewBox="0 0 20 20"
						class={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
				</button>
				{#if dropdownOpen}
					<div class="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
						<div class="px-2 py-2 bg-white rounded-md shadow dark:bg-gray-800">
							<a
								class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
								href="/dashboard/product/category">category</a
							>
							<a
								class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
								href="/dashboard/product/create">create</a
							>
						</div>
					</div>
				{/if}
			</div>
			<a
				class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
				href="/dashboard/pos">POS</a
			>
			<a
				class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
				href="/dashboard/docs">Documents</a
			>
		</nav>
	</div>
</div>
