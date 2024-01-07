<script lang="ts">
    import type { Task } from "$interfaces";
    import SolutionInput from "./solutionInput.svelte";
    import { onDestroy } from "svelte";

    export let taskIndex: number;
    export let taskValues: Task;
    export let deleteTask: (index: number) => void;

    const addNewSolution = () => {
        taskValues.solutions = [
            ...taskValues.solutions,
            {
                debitAccount: "",
                creditAccount: "",
                amount: ""
            }
        ];
    };

    const deleteSolution = (index: number) => {
        taskValues.solutions.splice(index, 1);
        taskValues = { ...taskValues };
    };
</script>

<div>
    <button on:click={() => deleteTask(taskIndex)} type="button">X</button>
    <label>
        <span>Datum</span>
        <input class="TaskInput" type="date" bind:value={taskValues.date} />
    </label>
    <label>
        <span>Beschreibung</span>
        <textarea bind:value={taskValues.description} />
    </label>
    {#each taskValues.solutions as solution, index}
        <SolutionInput
            solutionIndex={index}
            handleDeleteSolution={deleteSolution}
            solutionValues={solution}
        />
    {/each}
    <button on:click={() => addNewSolution()} type="button">Neuer Buchungssatz</button>
</div>

<style>
</style>
