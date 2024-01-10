<script lang="ts">
    import type { Assignment, CorrectedBookingEntry } from "$interfaces";
    import AssignmentTable from "./AssignmentTable.svelte";
    import TaskTable from "./TaskTable.svelte";
    import type { PageData } from "./$types";

    // Load data from the server
    export let data: PageData;
    let assignment: Assignment;

    if (!data.assignment) {
        throw new Error("No assignment found");
    }

    // Convert the date strings to Date objects
    const loadedAssignment: Assignment = data.assignment;
    loadedAssignment.tasks.forEach((task) => {
        task.date = new Date(task.date);
    });

    assignment = loadedAssignment;

    const submitAssignment = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        const data = new FormData(event.currentTarget);

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data
        });

        const result = await response.json();

        const checkedAnswers: CorrectedBookingEntry[] = JSON.parse(JSON.parse(result.data)[2]);
        let mistakes = 0;
        checkedAnswers.forEach((answer) => {
            if (answer.mistakeAmount) {
                mistakes += answer.mistakeAmount;
            }
        });

        alert(`Du hast ${mistakes} Fehler gemacht`);
    };
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
                <form
                    action="?/checkAsnwers"
                    method="post"
                    on:submit|preventDefault={submitAssignment}
                >
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
