import { browser } from "$app/environment";
import { writable } from "svelte/store";

/**
 * The store for the current semester
 *
 * - A value of 0 indicates that data is loading from local storage
 * - A value of -1 indicates that no semester is selected
 * - All other values indicate the id of the selected semester
 */
export const semesterStore = writable<number>(
	browser ? Number(localStorage.getItem("semester")) || -1 : 0
);
semesterStore.subscribe(val => {
	if (browser) return (localStorage.semester = val);
});
