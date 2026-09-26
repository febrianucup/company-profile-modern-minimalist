/**
 * Demo authentication.
 *
 * The admin account lives in the local store (see store.js) and the session is
 * persisted in localStorage ("remember me") or sessionStorage. This is fine
 * for a portfolio demo with no backend, but it is NOT real security: anyone
 * with devtools can read the stored credentials. Swap these functions for a
 * real API + httpOnly cookie session before shipping to production.
 */
import { useSyncExternalStore } from "react";

import { db, getState } from "./store";

const SESSION_KEY = "bomber.session.v1";

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

let session = readSession();
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function persistSession(remember) {
  const raw = JSON.stringify(session);
  try {
    if (remember) {
      localStorage.setItem(SESSION_KEY, raw);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, raw);
      localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Storage disabled: the session stays in memory for this tab.
  }
}

export function getSession() {
  return session;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React hook: current session ({ name, email, role } or null). */
export function useAuth() {
  return useSyncExternalStore(subscribe, getSession, getSession);
}

export function login(email, password, remember = true) {
  const normalized = String(email).trim().toLowerCase();
  const user = getState().users.find(
    (candidate) => candidate.email.toLowerCase() === normalized,
  );

  if (!user || user.password !== password) {
    return { ok: false, error: "Email atau password salah." };
  }

  session = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: new Date().toISOString(),
  };
  persistSession(remember);
  emit();
  return { ok: true };
}

export function logout() {
  session = null;
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  emit();
}

/** Update the signed-in account (name / email / password) from Settings. */
export function updateAccount(patch) {
  if (!session) return { ok: false, error: "Tidak ada sesi aktif." };

  if (patch.email) {
    const email = patch.email.trim().toLowerCase();
    const taken = getState().users.some(
      (user) => user.id !== session.userId && user.email.toLowerCase() === email,
    );
    if (taken) return { ok: false, error: "Email sudah dipakai akun lain." };
    patch = { ...patch, email };
  }

  db.updateUser(session.userId, patch);
  session = { ...session, ...patch };
  persistSession(Boolean(localStorage.getItem(SESSION_KEY)));
  emit();
  return { ok: true };
}
