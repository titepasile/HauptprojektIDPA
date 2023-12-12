<script lang="ts">
  import auth from '$lib/services/auth'
	import type { Auth0Client } from '@auth0/auth0-spa-js';
  import { isAuthenticated, user } from '../lib/stores/auth'
  import { onMount } from 'svelte'

  let auth0Client: undefined | Auth0Client; 

  onMount(async () => {
    auth0Client = await auth.createClient()
    isAuthenticated.set(await auth0Client.isAuthenticated())

    const userResult = await auth0Client.getUser();
    if (!userResult) {
      return;
    }
    user.set(userResult)
  })

  async function login() {
    await auth.loginWithPopup(auth0Client, {})
  }

  function logout() {
    auth.logout(auth0Client)
  }
</script>
  
<body>
  <h1>Welcome to SvelteKit</h1>
  <p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
    documentation
  </p>
  
  {#if $isAuthenticated}
    <h2>Hey {$user.name}!</h2> 
    {#if $user.picture}
      <img src={$user.picture} alt={user.name} />
    {:else}
      <img
        src="https://source.unsplash.com/random/400x300"
        alt="Random from unsplash"
      />
    {/if}
    <button on:click={logout}>Logout</button>
  {:else}
    <button on:click={login}>Login</button>
  {/if}
</body>
  