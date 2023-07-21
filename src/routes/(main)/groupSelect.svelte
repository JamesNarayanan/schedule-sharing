<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { groupStore } from "$stores/groupStore";
	import { fade } from "svelte/transition";

	let selectedGroupId: string | null = null;
	$: groups = $groupStore;

	let modalOpen = false;
	const transDur = 400;
	let plus: HTMLDivElement | undefined;

	$: {
		selectedGroupId = $page.url.pathname.substring(7);
	}

	function changeGroup(event: Event) {
		const select = event.target as HTMLSelectElement;
		const groupId = select.value;
		if (groupId) {
			goto(`/group/${groupId}`);
		}
	}

	function toggleModal() {
		if (!plus) return;
		plus.style.transitionDuration = `${transDur}ms`;
		const pos = plus.getBoundingClientRect();
		if (!modalOpen) {
			modalOpen = true;
			plus.style.position = "fixed";
			plus.style.top = `${pos.y}px`;
			plus.style.left = `${pos.x}px`;
		} else {
			modalOpen = false;
			setTimeout(() => {
				if (!plus) return;
				plus.style.top = "";
				plus.style.left = "";
				plus.style.position = "relative";
				plus.style.transitionDuration = "0s";
			}, transDur);
		}
	}
</script>

<div class="wrapper">
	<select on:change={changeGroup}>
		{#if !groups.some(group => group.id === selectedGroupId)}
			<option value="" disabled selected> Select Group </option>
		{/if}
		{#each groups as group}
			<option value={group.id} selected={group.id === selectedGroupId}>{group.name}</option>
		{/each}
	</select>
	<div class="plus" class:modalOpen bind:this={plus}>
		{#if !modalOpen}
			<div
				class="content closed"
				in:fade={{ delay: transDur / 2, duration: transDur / 2 }}
				out:fade={{ duration: transDur / 2 }}
			>
				<button on:click={toggleModal}>+</button>
			</div>
		{:else}
			<div
				class="content open"
				in:fade={{ delay: transDur / 2, duration: transDur / 2 }}
				out:fade={{ duration: transDur / 2 }}
			>
				<button on:click={toggleModal}>&#x2715;</button>
				<div>Create</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	div.wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		--font-size: 2rem;
	}

	select {
		background: url("/src/assets/arrow-down-dark.svg") no-repeat var(--low-alpha);
		background-size: var(--font-size);
		background-position: calc(100% - 0.5rem) center;

		padding: 0.5rem 2.5rem 0.5rem 0.75rem;
		border: none;
		border-radius: 10px;

		font-size: var(--font-size);
		font-weight: 600;
		transition: background-color 0.2s ease-in-out;

		-moz-appearance: none; /* Firefox */
		-webkit-appearance: none; /* Safari and Chrome */
		appearance: none;

		&:hover {
			background-color: var(--med-alpha);
		}

		@media (prefers-color-scheme: dark) {
			background-image: url("/src/assets/arrow-down.svg");
		}
	}

	.plus {
		position: relative;
		border-radius: 50%;
		height: calc(var(--font-size) * 1.25 + 1rem);
		width: calc(var(--font-size) * 1.25 + 1rem);

		transition: all ease-in-out;
		background-color: var(--med-alpha);

		.content {
			width: 100%;
			height: 100%;
			position: absolute;

			display: flex;
			align-items: center;
			justify-content: center;

			&.closed button {
				background-color: transparent;
				width: 100%;
				height: 100%;
				padding: 0;
				border: none;
				border-radius: 50%;

				font-size: calc(var(--font-size) * 1.25);
				line-height: calc(var(--font-size) * 1.3);
			}

			&.open {
				button {
					position: absolute;
					top: 0.5rem;
					right: 0.5rem;
				}
			}
		}

		&.modalOpen {
			position: fixed;
			top: 50% !important;
			left: 50% !important;
			transform: translate(-50%, -50%);
			width: min(600px, 90%);
			height: 300px;
			border-radius: 10px;
			backdrop-filter: blur(10px);
			z-index: 999;

			button {
				outline: none;
			}
		}
	}
</style>
