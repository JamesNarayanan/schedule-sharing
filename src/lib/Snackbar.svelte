<script lang="ts">
	import { onDestroy } from "svelte";
	import { fade } from "svelte/transition";

	/**
	 * Whether or not to show the snackbar
	 */
	export let show: boolean;
	/**
	 * The message to show in the snackbar
	 */
	export let message: string;
	/**
	 * The type of snackbar to show
	 *
	 * Defaults to "none" (no additional styling)
	 */
	export let type: "none" | "error" | "success" = "none";
	/**
	 * Whether or not to hide the snackbar after a set duration
	 *
	 * Defaults to true
	 */
	export let autoHide = true;
	/**
	 * The duration in milliseconds to show the snackbar for (if autoHide is true)
	 *
	 * Defaults to 3000 (3 seconds)
	 */
	export let duration = 3000;

	let timeout: NodeJS.Timeout;

	$: if (show) {
		if (autoHide) {
			timeout = setTimeout(() => {
				show = false;
			}, duration);
		}
	}

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

{#if show}
	<div class={`snackbar ${type}`} transition:fade>
		<span>{message}</span>
		<button
			on:click|stopPropagation={() => {
				show = false;
			}}>&#x2715;</button
		>
	</div>
{/if}

<style lang="scss">
	.snackbar {
		position: fixed;
		left: 1rem;
		bottom: 1rem;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;

		padding: 0.5rem;
		border-radius: 0.25rem;

		color: var(--text);
		background-color: var(--low-alpha);

		z-index: 9999;

		&.error {
			color: var(--dark-text);
			background-color: var(--error);

			button {
				background-color: var(--dark-med-alpha);

				&:hover {
					background-color: var(--dark-high-alpha);
				}
			}
		}
		&.success {
			color: var(--light-text);
			background-color: var(--success);

			button {
				background-color: var(--light-med-alpha);

				&:hover {
					background-color: var(--light-high-alpha);
				}
			}
		}

		button {
			color: inherit;
			font-size: 1rem;
		}
	}
</style>
