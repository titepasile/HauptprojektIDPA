import type { User } from "@auth0/auth0-spa-js";
import { browser } from "$app/environment";
import { writable } from "svelte/store";

// from here: https://rodneylab.com/using-local-storage-sveltekit/
let initialIsAuthenticated = false;
let initialUser: User | undefined;
let initialPopupOpen = false;

if (browser) {
    const isAuthenticatedData = sessionStorage.getItem("isAuthenticated");
    initialIsAuthenticated = isAuthenticatedData ? JSON.parse(isAuthenticatedData) : false;

    try {
        const userData = sessionStorage.getItem("user");
        initialUser = userData ? JSON.parse(userData) : undefined;
    } catch (error) {
        console.log(error);
    }

    const popupOpenData = sessionStorage.getItem("popupOpen");
    initialPopupOpen = popupOpenData ? JSON.parse(popupOpenData) : false;
}

export const isAuthenticated = writable<boolean>(initialIsAuthenticated);
export const user = writable<User | undefined>(initialUser);
export const popupOpen = writable<boolean>(initialPopupOpen);
export const error = writable();

isAuthenticated.subscribe((value) => {
    if (browser) {
        sessionStorage.setItem("isAuthenticated", JSON.stringify(value));
    }
});

user.subscribe((value) => {
    if (browser) {
        sessionStorage.setItem("user", JSON.stringify(value));
    }
});

popupOpen.subscribe((value) => {
    if (browser) {
        sessionStorage.setItem("popupOpen", JSON.stringify(value));
    }
});
