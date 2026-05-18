/*
  Account Storage
  ---------------
  Kleine localStorage-basierte Account-Verwaltung fuer die Demo-App.
  Das ist kein Ersatz fuer ein echtes Backend, reicht aber fuer lokale Nutzung.
*/

export interface Account {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

type AccountResult =
  | { ok: true; account: Account }
  | { ok: false; error: string };

type BasicResult =
  | { ok: true }
  | { ok: false; error: string };

const STORAGE_KEY = 'lifted_accounts_v2';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Account[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: Account[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `account_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function registerAccount(
  name: string,
  email: string,
  password: string
): AccountResult {
  const accounts = readAccounts();
  const normalizedEmail = normalizeEmail(email);

  if (accounts.some((account) => account.email === normalizedEmail)) {
    return { ok: false, error: 'Diese E-Mail-Adresse ist bereits registriert.' };
  }

  if (password.length < 6) {
    return { ok: false, error: 'Passwort muss mindestens 6 Zeichen lang sein.' };
  }

  const account: Account = {
    id: createId(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  writeAccounts([...accounts, account]);
  return { ok: true, account };
}

export function loginWithCredentials(email: string, password: string): AccountResult {
  const normalizedEmail = normalizeEmail(email);
  const account = readAccounts().find(
    (entry) => entry.email === normalizedEmail && entry.password === password
  );

  if (!account) {
    return { ok: false, error: 'E-Mail oder Passwort ist falsch.' };
  }

  return { ok: true, account };
}

export function getAccountById(id: string): Account | null {
  return readAccounts().find((account) => account.id === id) ?? null;
}

export function updateAccountName(id: string, name: string): BasicResult {
  const accounts = readAccounts();
  const index = accounts.findIndex((account) => account.id === id);

  if (index < 0) {
    return { ok: false, error: 'Account wurde nicht gefunden.' };
  }

  accounts[index] = { ...accounts[index], name: name.trim() };
  writeAccounts(accounts);
  return { ok: true };
}

export function updateAccountPassword(
  id: string,
  currentPassword: string,
  newPassword: string
): BasicResult {
  const accounts = readAccounts();
  const index = accounts.findIndex((account) => account.id === id);

  if (index < 0) {
    return { ok: false, error: 'Account wurde nicht gefunden.' };
  }

  if (accounts[index].password !== currentPassword) {
    return { ok: false, error: 'Aktuelles Passwort ist falsch.' };
  }

  if (newPassword.length < 6) {
    return { ok: false, error: 'Neues Passwort muss mindestens 6 Zeichen lang sein.' };
  }

  accounts[index] = { ...accounts[index], password: newPassword };
  writeAccounts(accounts);
  return { ok: true };
}

export function resetAccountPassword(email: string, newPassword: string): BasicResult {
  const accounts = readAccounts();
  const normalizedEmail = normalizeEmail(email);
  const index = accounts.findIndex((account) => account.email === normalizedEmail);

  if (index < 0) {
    return { ok: false, error: 'Fuer diese E-Mail-Adresse wurde kein Account gefunden.' };
  }

  if (newPassword.length < 6) {
    return { ok: false, error: 'Passwort muss mindestens 6 Zeichen lang sein.' };
  }

  accounts[index] = { ...accounts[index], password: newPassword };
  writeAccounts(accounts);
  return { ok: true };
}
