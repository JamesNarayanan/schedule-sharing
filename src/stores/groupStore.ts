import { persisted } from "svelte-local-storage-store";
import { get } from "svelte/store";
import type { Database } from "../Database";

type groupType = Database["public"]["Tables"]["groups"]["Row"];

function createStore() {
	const groupStore = persisted<groupType[]>("groups", []);

	/**
	 * Adds the group to the store if it doesn't already exist
	 * @param group The group to add to the store
	 */
	function addGroup(group: groupType) {
		if (get(groupStore).find(g => g.id === group.id)) return;
		groupStore.update(groups => [...groups, group]);
	}

	/**
	 * Removes of the group from the store or does nothing if it doesn't exist
	 * @param groupId The id of the group to remove from the store
	 */
	function removeGroup(groupId: string) {
		groupStore.update(groups => groups.filter(group => group.id !== groupId));
	}

	return {
		subscribe: groupStore.subscribe,
		addGroup,
		removeGroup
	};
}

export const groupStore = createStore();
