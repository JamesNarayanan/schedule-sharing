<script>
	import GroupSelect from "../GroupSelect.svelte";
</script>

<section>
	<GroupSelect />
</section>
<section>
	<slot />
</section>

<style>
	section:first-child {
		margin-bottom: 1rem;
	}
</style>
