<script lang="ts">
    import auth from "$lib/services/auth";
    import type { Auth0Client, User } from "@auth0/auth0-spa-js";
    import { isAuthenticated, user } from "../lib/stores/auth";
    import { onMount } from "svelte";

    let auth0Client: undefined | Auth0Client;
    let userResult: undefined | User;

    onMount(async () => {
        auth0Client = await auth.createClient();
        isAuthenticated.set(await auth0Client.isAuthenticated());

        userResult = await auth0Client.getUser();
        if (!userResult) {
            return;
        }
        user.set(userResult);
    });

    async function login() {
        if (!auth0Client) {
            return;
        }
        await auth.loginWithPopup(auth0Client, {});
    }

    function logout() {
        if (!auth0Client) {
            return;
        }
        auth.logout(auth0Client);
    }
</script>

<body>
    <h1>Welcome to SvelteKit</h1>
    <p>
        Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    </p>

    {#if $isAuthenticated}
        <h2>Hey {userResult?.name}!</h2>
        {#if userResult?.picture}
            <img src={userResult?.picture} alt={userResult?.name} />
        {:else}
            <img src="https://source.unsplash.com/random/400x300" alt="Random from unsplash" />
        {/if}
        <button on:click={logout}>Logout</button>
    {:else}
        <button on:click={login}>Login</button>
    {/if}
</body>
