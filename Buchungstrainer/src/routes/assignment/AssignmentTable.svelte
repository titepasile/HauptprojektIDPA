<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import type { Task } from '../../interfaces.js';

	export let tableData: Task[];
</script>

<table>
	<thead>
		<tr>
			<th>Date</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.values(tableData) as row}
			<tr>
				<th>{row.date.toDateString()}</th>
				<th>{row.description}</th>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table,
	th,
	td {
		border: 1px solid;
		border-collapse: collapse;
		margin: 10px;
	}
</style>
