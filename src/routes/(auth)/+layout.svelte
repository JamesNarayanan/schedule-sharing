<script>
	import HeaderTitle from "$lib/HeaderTitle.svelte";
</script>

<HeaderTitle />
<section>
	<slot />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
	}
</style>
