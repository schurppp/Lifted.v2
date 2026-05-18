/*
  Auth Context – Email/Passwort-Authentifizierung
  -------------------------------------------------
  Verwaltet den Login-Zustand der gesamten App.
  Nutzt accountStorage.ts als simulierte localStorage-DB.

  Session-Speicherung: Nach erfolgreichem Login wird die Account-ID
  in localStorage gespeichert (SESSION_KEY). Beim App-Start wird
  diese ID geprüft und der Account geladen – so bleibt man eingeloggt.
*/

import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  registerAccount,
  loginWithCredentials,
  getAccountById,
  updateAccountName,
  updateAccountPassword,
  type Account,
} from '../storage/accountStorage';

// ─── Typen ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userName: string;
  userEmail: string;
  userId: string;
  /** Erstellt neuen Account und loggt direkt ein. Gibt Fehlermeldung zurück oder null. */
  register: (name: string, email: string, password: string) => Promise<string | null>;
  /** Prüft Credentials und loggt ein. Gibt Fehlermeldung zurück oder null. */
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  /** Aktualisiert den Anzeigenamen. Gibt Fehlermeldung zurück oder null. */
  updateUserName: (newName: string) => string | null;
  /** Ändert das Passwort (prüft das aktuelle). Gibt Fehlermeldung zurück oder null. */
  changePassword: (currentPassword: string, newPassword: string) => string | null;
}

// ─── Session Storage ──────────────────────────────────────────────────────────

const SESSION_KEY = 'lifted_session_v2'; // v2 wegen Breaking Change zur alten Name-Session

function readStoredSession(): { account: Account | null } {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return { account: null };
    const { userId } = JSON.parse(raw) as { userId?: string };
    if (!userId) return { account: null };
    return { account: getAccountById(userId) };
  } catch {
    return { account: null };
  }
}

function writeSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(
    () => readStoredSession().account
  );

  const isLoggedIn = account !== null;

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<string | null> {
    // Kurze Verzögerung simuliert Netzwerklatenz
    await new Promise((r) => setTimeout(r, 500));
    const result = registerAccount(name, email, password);
    if (!result.ok) return result.error;
    writeSession(result.account.id);
    setAccount(result.account);
    return null; // kein Fehler
  }

  async function login(
    email: string,
    password: string
  ): Promise<string | null> {
    await new Promise((r) => setTimeout(r, 500));
    const result = loginWithCredentials(email, password);
    if (!result.ok) return result.error;
    writeSession(result.account.id);
    setAccount(result.account);
    return null;
  }

  function logout(): void {
    clearSession();
    setAccount(null);
  }

  function updateUserName(newName: string): string | null {
    if (!account) return 'Nicht eingeloggt.';
    const trimmed = newName.trim();
    if (!trimmed) return 'Name darf nicht leer sein.';
    updateAccountName(account.id, trimmed);
    setAccount((prev) => prev ? { ...prev, name: trimmed } : prev);
    return null;
  }

  function changePassword(currentPassword: string, newPassword: string): string | null {
    if (!account) return 'Nicht eingeloggt.';
    const result = updateAccountPassword(account.id, currentPassword, newPassword);
    if (!result.ok) return result.error;
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading: false,
        userName: account?.name ?? '',
        userEmail: account?.email ?? '',
        userId: account?.id ?? '',
        register,
        login,
        logout,
        updateUserName,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth muss innerhalb von <AuthProvider> verwendet werden');
  return ctx;
}
