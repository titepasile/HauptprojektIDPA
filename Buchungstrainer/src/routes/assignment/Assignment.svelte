<script lang="ts">
	import { SvelteComponent } from 'svelte';
	import type { Assignment, Task } from '../../interfaces.js';
	import AssignmentTable from './AssignmentTable.svelte';
	import TaskTable from './TaskTable.svelte';

	function GetData(): Assignment {
		const testData: Assignment = {
			id: '1',
			authorId: '1',
			title: 'TestData',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque tempore, fuga temporibus impeditdolorem atque',
			tasks: [
				{
					date: new Date('2019-01-18'),
					description: 'Es werden Waren im Wert von 500 CHF auf Rechnung eingekauft.',
					solutions: [
						{
							debitAccount: 'Warenaufwand',
							creditAccount: 'VLL',
							amount: 500
						}
					]
				},
				{
					date: new Date('2019-02-16'),
					description: 'Es werden Waren im Wert von 600 CHF auf Rechnung verkauft.',
					solutions: [
						{
							debitAccount: 'FLL',
							creditAccount: 'Warenertrag',
							amount: 600
						}
					]
				}
			]
		};

		return testData;
	}

	const assignment: Assignment = GetData();
	const tasks: Task[] = assignment.tasks;

	function HandelSubmit(event: SubmitEvent) {
		console.log(event);
	}
</script>

<div class="WholeContainer">
	<div class="PartContainer">
		<div class="PartContent">
			<h1>{assignment.title}</h1>
			<div>{assignment.description}</div>
			<AssignmentTable tableData={tasks} />
		</div>
	</div>
	<div class="PartContainer">
		<div class="PartContent">
			<div>Text</div>
			<form on:submit={HandelSubmit}>
				<TaskTable tableData={tasks} />
				<input type="submit" value="Fertig" />
			</form>
		</div>
	</div>
</div>

<style>
	:global(body) {
		height: 100vh;
		margin: 0;
		padding: 0;
	}

	.WholeContainer {
		display: grid;
		grid-template-columns: 40% auto;
		grid-template-rows: 100vh;
	}

	.PartContainer {
		height: 100%;
		overflow: auto;
	}

	.PartContent {
		padding: 2rem;
	}

	@media screen and (max-width: 992px) {
		.WholeContainer {
			background-color: blue;
		}
	}
</style>
