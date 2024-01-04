<script lang="ts">
    import type { Task } from "$interfaces";

    export let tableData: Task[];
</script>

<table class="AssigmentTable">
    <thead>
        <tr>
            <th>Datum</th>
            <th>Beschreibung</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.values(tableData) as row}
            <tr>
                <th>{row.date.getDate()}.{row.date.getMonth() + 1}.{row.date.getFullYear()}</th>
                <th>{row.description}</th>
            </tr>
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

    .AssigmentTable {
        width: 100%;
    }
</style>
