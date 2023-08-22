import { persisted } from "svelte-local-storage-store";
import type { Database } from "../Database";

type semesterIdType = Database["public"]["Tables"]["semesters"]["Row"]["id"];

/**
 * The store for the current semester
 *
 * - A value of -1 indicates that data is loading from local storage
 * - A value of 0 indicates that no semester is selected
 * - All other values indicate the id of the selected semester
 */
export const semesterStore = persisted<semesterIdType>("semester", -1);
