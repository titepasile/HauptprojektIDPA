<script lang="ts">
    import type { Assignment } from "$interfaces";
    import TaskInput from "./taskInput.svelte";
    import type { PageData } from "./$types";

    import { invalidateAll } from "$app/navigation";
    import { applyAction, deserialize } from "$app/forms";

    import type { ActionData } from "./$types";
    import type { ActionResult } from "@sveltejs/kit";

    // Load data from the server
    export let data: PageData;
    let newAssignment: Assignment;
    if (!data.assignment) {
        throw new Error("No assignment found");
    }
    newAssignment = data.assignment;
    newAssignment.authorId = "id"; // Needs to be changed when login done

    const addNewTaskInput = () => {
        newAssignment.tasks = [
            ...newAssignment.tasks,
            {
                date: new Date(),
                description: "",
                solutions: []
            }
        ];
        console.log(newAssignment);
    };

    const deleteInput = (index: number) => {
        newAssignment.tasks.splice(index, 1);
        newAssignment = { ...newAssignment };
    };

    const submitAssignment = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        const data = new FormData();
        data.append("newAssignment", JSON.stringify(newAssignment));

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data
        });
    };
</script>

<div class="container">
    <h1>Neuer Auftrag</h1>
    <form
        class="form"
        method="POST"
        action="?/createAssignment"
        on:submit|preventDefault={submitAssignment}
    >
        <label class="titleLabel">
            <span>Titel</span>
            <input class="titleInput" type="text" bind:value={newAssignment.title} />
        </label>
        <label class="titleLabel">
            <span>Beschreibung</span>
            <textarea class="titleInput" bind:value={newAssignment.description} />
        </label>
        {#each newAssignment.tasks as newTask, index}
            <TaskInput taskIndex={index} taskValues={newTask} deleteTask={deleteInput} />
        {/each}
        <button on:click={() => addNewTaskInput()} type="button">Neuer Buchungsfall</button>
        <button type="submit">done</button>
    </form>
</div>

<style>
    :global(body) {
        width: 100vw;
        min-height: 100vh;

        overflow-x: hidden;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .titleLabel {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
    }

    .titleInput {
        max-width: 300px;
        width: 100%;
    }
</style>
