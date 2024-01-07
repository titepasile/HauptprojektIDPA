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

<div class="container">
    <button on:click={() => deleteTask(taskIndex)} type="button">X</button>
    <label class="TaskLabel">
        <span>Datum</span>
        <input class="TaskInput" type="date" bind:value={taskValues.date} />
    </label>
    <label class="TaskLabel">
        <span>Beschreibung</span>
        <textarea class="TaskInput" bind:value={taskValues.description} />
    </label>
    <div>
        {#each taskValues.solutions as solution, index}
            <SolutionInput
                solutionIndex={index}
                handleDeleteSolution={deleteSolution}
                solutionValues={solution}
            />
        {/each}
    </div>
    <button on:click={() => addNewSolution()} type="button">Neuer Buchungssatz</button>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin: 1rem auto;
        padding: 2rem;
    }

    .TaskLabel {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
    }

    .TaskInput {
        max-width: 300px;
        width: 100%;
    }
</style>
