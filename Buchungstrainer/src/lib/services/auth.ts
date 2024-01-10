import { env } from "$env/dynamic/public";
import { isAuthenticated, popupOpen, user } from "$lib/stores/auth";
import { type Auth0Client, createAuth0Client, type PopupLoginOptions } from "@auth0/auth0-spa-js";

async function createClient() {
    const auth0Client = await createAuth0Client({
        domain: env.PUBLIC_DOMAIN || "",
        clientId: env.PUBLIC_AUTH0_CLIENT_ID || ""
    });

    return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: PopupLoginOptions) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client: Auth0Client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;
