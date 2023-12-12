/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAuthenticated, popupOpen, user } from '$lib/stores/auth'
import {createAuth0Client} from '@auth0/auth0-spa-js'

async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: process.env.DOMAIN || "",
    clientId: process.env.AUTH0_CLIENT_ID || ""
  })

  return auth0Client
}

async function loginWithPopup(client: any, options: any) {
  popupOpen.set(true)
  try {
    await client.loginWithPopup(options)

    user.set(await client.getUser())
    isAuthenticated.set(true)
  } catch (e) {
    console.error(e)
  } finally {
    popupOpen.set(false)
  }
}

function logout(client: any) {
  return client.logout()
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
}

export default auth
