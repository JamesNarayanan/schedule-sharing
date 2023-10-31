<script>
	import { Moon } from "svelte-loading-spinners";

	/**
	 * Moon spinner size in pixels. Defaults to 25.
	 */
	export let size = 25;
</script>

<Moon color="var(--text)" {size} />
