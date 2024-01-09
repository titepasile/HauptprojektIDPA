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
        {#each Object.values(tableData) as task, index1}
            {#each // eslint-disable-next-line
            task.solutions as solution, index2}
                <tr>
                    <th>
                        <input
                            name="date"
                            id={`date${index1}.${index2}`}
                            class="TaskInput"
                            type="date"
                        />
                    </th>
                    <th>
                        <input
                            name="debitAccount"
                            id={`debitAccount${index1}.${index2}`}
                            class="TaskInput"
                            type="text"
                        />
                    </th>
                    <th>
                        <input
                            name="creditAccount"
                            id={`creditAccount${index1}.${index2}`}
                            class="TaskInput"
                            type="text"
                        />
                    </th>
                    <th>
                        <input
                            name="amount"
                            id={`number${index1}.${index2}`}
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
