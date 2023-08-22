import { persisted } from "svelte-local-storage-store";
import type { Database } from "../Database";

type semesterIdType = Database["public"]["Tables"]["semesters"]["Row"]["id"];

export const semesterStore = persisted<semesterIdType>("semester", -1);
