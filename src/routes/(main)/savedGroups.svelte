<script lang="ts">
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	let groups: groupType[] = [];
	let selectedGroupId: string | null = null;
	$: groups = $groupStore;

	$: {
		selectedGroupId = $page.url.pathname ? $page.url.pathname.substring(1) : null;
	}
</script>

<nav class="saved-groups">
	<h1>Groups</h1>
	<ul>
		{#each groups as group}
			<li class:selected={group.id === selectedGroupId}>
				<a href={`/${group.id}`}>{group.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	.saved-groups {
		display: flex;
		gap: 1.25rem;

		h1 {
			margin: 0;
			font-size: 2rem;
			font-weight: 600;
			line-height: 1;
		}

		ul {
			display: flex;
			flex-direction: row;
			margin: 0;
			padding: 0;
			gap: 0.75rem;

			li {
				display: flex;
				align-items: center;
				border-radius: 5px;
				list-style: none;
				background-color: var(--low-alpha);
				font-weight: 600;

				transition: background-color 0.1s ease-in-out;

				&:hover {
					background-color: var(--med-alpha);
				}

				&.selected {
					background-color: var(--text);
					color: var(--bg);
				}

				a {
					padding: 0.25rem 0.5rem;
					text-decoration: none;
					color: inherit;
				}
			}
		}
	}
</style>
