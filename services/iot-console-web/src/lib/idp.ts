import { type User, UserManager, WebStorageStateStore } from "oidc-client-ts";

const TOKEN_KEY = "luminary_iot_token";

export function isIdpEnabled(): boolean {
  return Boolean(import.meta.env.VITE_IDP_ISSUER && import.meta.env.VITE_IDP_CLIENT_ID);
}

function userManager(): UserManager {
  return new UserManager({
    authority: import.meta.env.VITE_IDP_ISSUER!.replace(/\/$/, ""),
    client_id: import.meta.env.VITE_IDP_CLIENT_ID!,
    redirect_uri: import.meta.env.VITE_IDP_REDIRECT_URI ?? `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri:
      import.meta.env.VITE_IDP_POST_LOGOUT_URI ?? `${window.location.origin}/login`,
    response_type: "code",
    scope: "openid profile email offline_access",
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  });
}

export async function signIn(): Promise<void> {
  await userManager().signinRedirect();
}

export async function handleCallback(): Promise<string> {
  const user: User = await userManager().signinRedirectCallback();
  localStorage.setItem(TOKEN_KEY, user.access_token);
  return user.access_token;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function signOut(): Promise<void> {
  localStorage.removeItem(TOKEN_KEY);
  if (isIdpEnabled()) await userManager().signoutRedirect();
}

export function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
