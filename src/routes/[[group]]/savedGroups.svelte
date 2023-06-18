<script lang="ts">
	import type { groupType } from "$lib/types";
	import { groupStore } from "$stores/groupStore";

	let groups: groupType[] = [];
	$: groups = $groupStore;
</script>

<div class="saved-groups">
	<h1>Groups</h1>
	<ul>
		{#each groups as group}
			<li><a href={`/${group.id}`}>{group.name}</a></li>
		{/each}
	</ul>
</div>

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
		}

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
		}

		a {
			padding: 0.25rem 0.5rem;
			text-decoration: none;
			color: inherit;
		}
	}
</style>
