<script lang="ts">
    import type { Assignment } from "$interfaces";
    import AssignmentTable from "./AssignmentTable.svelte";
    import TaskTable from "./TaskTable.svelte";
    import type { PageData } from "./$types";

    // Load data from the server
    export let data: PageData;
    let assignment: Assignment;

    if (!data.assignment) {
        throw new Error("No assignment found");
    }

    assignment = data.assignment;
</script>

{#if !assignment}
    <h1>Keine Aufgabe gefunden</h1>
{:else}
    <div class="WholeContainer">
        <div class="PartContainer">
            <div class="PartContent">
                <h1>{assignment.title}</h1>
                <div>{assignment.description}</div>
                <AssignmentTable tableData={assignment.tasks} />
            </div>
        </div>
        <div class="PartContainer">
            <div class="PartContent">
                <form action="?/checkAsnwers" method="post">
                    <TaskTable tableData={assignment.tasks} />
                    <button>Fertig</button>
                </form>
            </div>
        </div>
    </div>
{/if}

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
