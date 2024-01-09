import type { User } from "@auth0/auth0-spa-js";
import { browser } from '$app/environment';
import { writable } from "svelte/store";

// from here: https://rodneylab.com/using-local-storage-sveltekit/
const initialIsAuthenticated = browser ? JSON.parse(sessionStorage.getItem("isAuthenticated") ?? "false") : false;
const initialUser = browser ? JSON.parse(sessionStorage.getItem("user") ?? "undefined") : undefined;
const initialPopupOpen = browser ? JSON.parse(sessionStorage.getItem("popupOpen") ?? "false") : false;

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