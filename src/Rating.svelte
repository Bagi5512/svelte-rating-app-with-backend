<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let rating = 0;

	let setRating = (event) => {
		rating = event.currentTarget.getAttribute("data-id");
		dispatch('rating', rating);
	}
</script>

<!-- from material design icons (https://material.io/resources/icons) -->
<svg style="display: none;">
	<symbol id="icon-star-full" viewBox="0 0 24 24" fill="orange" width="24px" height="24px"><g><rect fill="none" height="24" width="24" x="0"/><polygon points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10"/></g></symbol>
	<symbol id="icon-star-empty" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></symbol>
</svg>

<div class="star-container">
	{#each {length: rating} as _, i}
		<svg class="star-icon" data-id="{i+1}" on:click={setRating}>
			<use href="#icon-star-full"/>
		</svg>
	{/each}

	{#each {length: 5-rating} as _, i}
		<svg class="star-icon" data-id="{i+1+parseInt(rating)}" on:click={setRating}>
			<use href="#icon-star-empty"/>
		</svg>
	{/each}
</div>

<style>
	.star-container {
		margin-left: 16px;
		margin-right: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.star-icon {
		width: 24px;
		height: 24px;
	}
</style>