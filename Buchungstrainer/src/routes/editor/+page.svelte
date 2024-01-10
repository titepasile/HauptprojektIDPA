<script lang="ts">
    import type { Assignment } from "$interfaces";
    import TaskInput from "./taskInput.svelte";
    import type { PageData } from "./$types";
    import type { User } from "@auth0/auth0-spa-js";
    import { isAuthenticated, user } from "$lib/stores/auth";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";

    const myUser: User | undefined = $user;
    const auth: boolean = $isAuthenticated;

    if (!auth && browser) {
        goto("/");
    }

    // Load data from the server
    export let data: PageData;
    let newAssignment: Assignment;
    if (!data.assignment) {
        throw new Error("No assignment found");
    }

    newAssignment = data.assignment;

    const addNewTaskInput = () => {
        newAssignment.tasks = [
            ...newAssignment.tasks,
            {
                date: new Date(),
                description: "",
                solutions: []
            }
        ];
    };

    const deleteInput = (index: number) => {
        newAssignment.tasks.splice(index, 1);
        newAssignment = { ...newAssignment };
    };

    const submitAssignment = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        newAssignment.authorId = myUser?.sub || "";

        const data = new FormData();
        data.append("newAssignment", JSON.stringify(newAssignment));

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
    <h1>Neuer Auftrag</h1>
    <button on:click={() => goto("/overview")}>Zurück</button>
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
