<script lang="ts">
	import { dev } from "$app/environment";
	import { invalidate } from "$app/navigation";
	import { inject } from "@vercel/analytics";
	import { onMount } from "svelte";

	import "./index.scss";

	inject({ mode: dev ? "development" : "production" });

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<slot />
