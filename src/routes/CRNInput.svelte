<script lang="ts">
	import * as cheerio from "cheerio";

	let CRNs = "86388, 83809, 83440, 84586";
	let CRNArray = [];

	let classes: string[] = [];

	async function getCRNs() {
		CRNs = CRNs.replaceAll(/[^\d,]/g, "");
		CRNArray = CRNs.split(",");

		const requests = CRNArray.map(async (CRN) => {
			if (CRN.length != 5) {
				return "";
			}
			if (localStorage.getItem(CRN)) {
				return localStorage.getItem(CRN) || "";
			}
			const response = await fetch(
				`/oscar/bprod/bwckschd.p_disp_detail_sched?term_in=202308&crn_in=${CRN}`
			);
			const html = await response.text();
			const $ = cheerio.load(html);
			const text = $("th.ddlabel").first().text();
			if (!text) {
				return "";
			}
			localStorage.setItem(CRN, text);

			return text;
		});

		classes = (await Promise.all(requests)).filter((x) => !!x);
	}
</script>

<input type="text" bind:value={CRNs} />
<button on:click={getCRNs}>Submit</button>

{#if classes.length > 0}
	<ul>
		{#each classes as classText}
			{#if classText}
				<li>{classText}</li>
			{/if}
		{/each}
	</ul>
{/if}
