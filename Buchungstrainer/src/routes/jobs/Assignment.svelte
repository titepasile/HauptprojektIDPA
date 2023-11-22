<script lang="ts">
	import type { Assignment } from '../../interfaces.ts';

	function GetData(): Assignment {
		const testData: Assignment = {
			id: '1',
			authorId: '1',
			title: 'TestData',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque tempore, fuga temporibus impeditdolorem atque',
			tasks: [
				{
					date: new Date('2019-01-16'),
					description: 'Es werden Waren im Wert von 500 CHF auf Rechnung eingekauft.',
					solutions: []
				},
				{
					date: new Date('2019-01-16'),
					description: 'Es werden Waren im Wert von 600 CHF auf Rechnung verkauft.',
					solutions: []
				}
			]
		};

		return testData;
	}

	const assignment: Assignment = GetData();
</script>

<div class="WholeContainer">
	<div class="PartConainer">
		<h1>{assignment.title}</h1>
		<div>{assignment.description}</div>
		<li>{assignment.tasks}</li>
	</div>
	<div class="PartConainer">
		<div>Text</div>
		<button>done</button>
	</div>
</div>

<style>
	.WholeContainer {
		display: grid;
		grid-template-columns: 35% auto;
	}

	.PartContainer {
		overflow: hidden;
	}

	@media screen and (max-width: 992px) {
		.WholeContainer {
			background-color: blue;
		}
	}
</style>
