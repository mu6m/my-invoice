<script>
	import { page } from '$app/stores';
</script>

<h2 class="font-semibold">welcome {$page.data.user.name.join(' ')} !</h2>

<h1>{$page.data.p_count} products created</h1>
<h1>{$page.data.inv_count} invoices created</h1>

<!-- <h1>total sales :</h1> -->
