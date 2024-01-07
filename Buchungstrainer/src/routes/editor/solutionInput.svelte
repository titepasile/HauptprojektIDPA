<script lang="ts">
    import type { BookingEntry } from "$interfaces";
    export let solutionIndex: number;
    export let handleDeleteSolution: (index: number) => void;
    export let solutionValues: BookingEntry;
</script>

<div class="container">
    <button on:click={() => handleDeleteSolution(solutionIndex)} type="button">
        Buchungssatz löschen
    </button>
    <label>
        <input class="SolutionInput" type="text" bind:value={solutionValues.debitAccount} />
        <input class="SolutionInput" type="text" bind:value={solutionValues.creditAccount} />
        <input class="SolutionInput" type="number" bind:value={solutionValues.amount} />
    </label>
</div>

<style>
    .container {
        margin: 0.9rem 0;
        padding: 0;
    }
</style>
