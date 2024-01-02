<script lang="ts">
    import type { Task } from "$interfaces";
    export let tableData: Task[];
</script>

<table class="TaksTable">
    <thead>
        <tr>
            <th>Date</th>
            <th>Soll</th>
            <th>Haben</th>
            <th>Betrag</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.values(tableData) as singleAssigment}
            {#each singleAssigment.solutions as row}
                <tr>
                    <th><input id={row.toString()} class="TaskInput" type="date" /></th>
                    <th><input id={row.toString()} class="TaskInput" /></th>
                    <th><input id={row.toString()} class="TaskInput" /></th>
                    <th><input id={row.toString()} class="TaskInput" type="number" /></th>
                </tr>
            {/each}
        {/each}
    </tbody>
</table>

<style>
    table,
    th {
        border: 1px solid;
        border-collapse: collapse;
        margin: 10px;
    }

    .TaksTable {
        width: 100%;
    }

    .TaskInput {
        height: 100%;
        width: 100%;

        margin: 0;
        padding: 0;
        border: 0;
    }
</style>
