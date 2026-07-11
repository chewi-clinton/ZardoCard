"use client";

import { apiFetch } from "@/lib/api";

const ACCESS_KEY = "zc_admin_access";
const REFRESH_KEY = "zc_admin_refresh";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

function setTokens({ access, refresh }) {
  window.localStorage.setItem(ACCESS_KEY, access);
  if (refresh) window.localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
}

export function isLoggedIn() {
  return Boolean(getAccessToken());
}

export async function login(username, password) {
  const data = await apiFetch("/api/auth/login/", {
    method: "POST",
    body: { username, password },
  });
  setTokens(data);
  return data;
}

export function logout() {
  clearTokens();
}

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  try {
    const data = await apiFetch("/api/auth/refresh/", {
      method: "POST",
      body: { refresh },
    });
    setTokens({ access: data.access, refresh });
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

// Authenticated fetch for admin CRUD — retries once with a refreshed
// access token if the first attempt comes back 401 (expired token).
export async function authFetch(path, options = {}) {
  let token = getAccessToken();
  try {
    return await apiFetch(path, { ...options, token });
  } catch (err) {
    if (err.status === 401) {
      token = await refreshAccessToken();
      if (token) {
        return apiFetch(path, { ...options, token });
      }
    }
    throw err;
  }
}
