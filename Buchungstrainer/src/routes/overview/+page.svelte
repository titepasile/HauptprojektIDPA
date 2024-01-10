<script lang="ts">
    import type { Assignment } from "$interfaces";
    import type { PageData } from "./$types";
    import { isAuthenticated, user } from "$lib/stores/auth";
    import { goto } from "$app/navigation";
    import type { User } from "@auth0/auth0-spa-js";
    import { browser } from "$app/environment";

    const myUser: User | undefined = $user;
    const auth: boolean = $isAuthenticated;

    // If not authenticated, redirect to login page
    if (!auth && browser) {
        goto("/");
    }

    // Load data from the server
    export let data: PageData;
    const assignments: Assignment[] = [];

    data.assignment.forEach((element) => {
        const key = element.key;
        const assignment = JSON.parse(element.value.toString()) as Assignment;
        assignment.key = key?.toString() || "";

        assignments.push(assignment);
    });
</script>

<div class="Container">
    <h1>Overview</h1>
    <a href="/editor" class="TableButton">Create new assignment</a>
    {#each assignments as assignment}
        <div class="ContainerAssignmenttable">
            <section>{assignment.title}</section>
            <div>
                <a href="/assignment/{assignment.key}" class="TableButton">Test Yourself</a>
                {#if assignment.authorId === myUser?.sub}
                    <a href="/editor/{assignment.key}" class="TableButton">Edit</a>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    .Container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ContainerAssignmenttable {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        min-width: 500px;
        margin: 10px;
        padding: 10px;
        background-color: lightgray;
        border-radius: 10px;
    }

    .TableButton {
        padding: 10px;
        border-radius: 10px;
        color: black;
        background-color: lightblue;
        text-decoration: none;
    }
</style>
