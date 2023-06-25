<script lang="ts">
	import { page } from "$app/stores";
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";

	let groups: groupType[] = [];
	let selectedGroupId: string | null = null;
	$: groups = $groupStore;

	$: {
		selectedGroupId = $page.url.pathname.substring(7);
	}
</script>

<nav class="saved-groups">
	<h1>Groups</h1>
	<ul>
		{#each groups as group}
			<li class:selected={group.id === selectedGroupId}>
				<a href={`/group/${group.id}`} class="button">{group.name}</a>
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
				list-style: none;
				display: flex;

				&.selected a {
					background-color: var(--text);
					color: var(--bg);
				}
			}
		}
	}
</style>
