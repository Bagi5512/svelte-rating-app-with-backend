<script>
	import AddEntry from './AddEntry.svelte';
	import Entry from './Entry.svelte';
	import RatingApi from './api.js';

	let api = new RatingApi();
	let entries = [];

	let onAddEntry = (event) => {
		api.addEntry(event.detail).then(() => update());
	};

	let onUpdateEntry = (event) => {
		api.updateEntry(event.detail).then(() => update());
	};

	let onRemoveEntry = (event) => {
		api.deleteEntry(event.detail.id).then(() => update());
	};

	let update = () => {
		api.getEntries().then((serverentries) => entries = serverentries);
	};

	update();

</script>

<div class="main">
	<header>Professor Rating App</header>

	<p>New rating</p>
	<AddEntry on:addentry={onAddEntry}/>

	{#if entries.length === 0}
		<p>No ratings</p>
	{:else}
		<p>Ratings</p>
		{#each entries as entry}
    		<Entry on:updateentry={onUpdateEntry} on:removeentry={onRemoveEntry} entry={entry}/>
		{/each}
	{/if}
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		border: 0;
	}
	
	.main {
		max-width: 500px;
		height: 100%;
		background-color: lightblue;
		display: flex;
		flex-direction: column;
		padding-left: 16px;
		padding-right: 16px;
	}

	
	.main header {
		height: 64px;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16px;
	}

	.main p {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
