<script lang="ts">
    import type { Assignment } from "$interfaces";
    import TaskInput from "../taskInput.svelte";
    import type { PageData } from "./$types";
    import type { User } from "@auth0/auth0-spa-js";
    import { isAuthenticated, user } from "$lib/stores/auth";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    const myUser: User | undefined = $user;
    const auth: boolean = $isAuthenticated;

    // redirect to login if not authenticated
    if (!auth && browser) {
        goto("/");
    }

    // Load data from the server
    export let data: PageData;
    let changedAssignment: Assignment;
    if (!data.assignment) {
        throw new Error("No assignment found");
    }

    changedAssignment = data.assignment;
    changedAssignment.tasks.forEach((task) => {
        task.date = new Date(task.date);
    });

    const addNewTaskInput = () => {
        changedAssignment.tasks = [
            ...changedAssignment.tasks,
            {
                date: new Date(),
                description: "",
                solutions: []
            }
        ];
    };

    const deleteInput = (index: number) => {
        changedAssignment.tasks.splice(index, 1);
        changedAssignment = { ...changedAssignment };
    };

    const submitAssignment = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        changedAssignment.authorId = myUser?.sub || "";

        const data = new FormData();
        data.append("newAssignment", JSON.stringify(changedAssignment));

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data
        });

        const result = await response;
        if (result.status === 200) {
            goto("/overview");
        }
    };
</script>

<div class="container">
    <h1>Auftrag Bearbeiten</h1>
    <button on:click={() => goto("/overview")}>Zurück</button>
    <form
        class="form"
        method="POST"
        action="?/createAssignment"
        on:submit|preventDefault={submitAssignment}
    >
        <label class="titleLabel">
            <span>Titel</span>
            <input class="titleInput" type="text" bind:value={changedAssignment.title} />
        </label>
        <label class="titleLabel">
            <span>Beschreibung</span>
            <textarea class="titleInput" bind:value={changedAssignment.description} />
        </label>
        {#each changedAssignment.tasks as newTask, index}
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
