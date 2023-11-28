<script>
    let auth0Client = null;

const fetchAuthConfig = () => fetch('###');

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
  };

  window.onload = async () => {
    await configureClient();
  }

  const login = ()=> {

  }

  const logout = ()=> {
    
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<body>
    <div id="title">
        <h2>Buchungstrainer</h2>
        <p>Welcome to our page!</p>
    </div>
    
    <div id="buttons">
        <button id="btn-login" on:click={login}>Log in</button>
        <button id="btn-logout" on:click={logout}>Log out</button>
    </div>
</body>
