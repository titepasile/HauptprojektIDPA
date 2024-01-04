<script lang="ts">
    import type { Task } from "$interfaces";
    export let tableData: Task[];
</script>

<table class="TaksTable">
    <thead>
        <tr>
            <th>Datum</th>
            <th>Soll</th>
            <th>Haben</th>
            <th>Betrag</th>
        </tr>
    </thead>
    <tbody id="tableContent">
        {#each Object.values(tableData) as singleAssigment}
            {#each singleAssigment.solutions as solution, index}
                <tr>
                    <th>
                        <input name="date" id={`date${index}`} class="TaskInput" type="date" />
                    </th>
                    <th>
                        <input
                            name="debitAccount"
                            id={`debitAccount_${index}`}
                            class="TaskInput"
                            type="text"
                        />
                    </th>
                    <th>
                        <input
                            name="creditAccount"
                            id={`creditAccount_${index}`}
                            class="TaskInput"
                            type="text"
                        />
                    </th>
                    <th>
                        <input
                            name="amount"
                            id={`number_${index}`}
                            class="TaskInput"
                            type="number"
                        />
                    </th>
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
