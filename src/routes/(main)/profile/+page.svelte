<script lang="ts">
	export let data;

	$: user = data.user;
</script>

<h2>{user.user_metadata.name}'s Courses</h2>

<style lang="scss">
	h2 {
		font-size: 2rem;
		margin-top: 0;
	}
</style>
