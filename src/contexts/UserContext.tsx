/*
  User Context
  -------------
  Verwaltet das Nutzerprofil (Ziele, Level, Präferenzen).
  Warum getrennt von AuthContext: Auth und Profil sind verschiedene Konzepte.
  Jemand kann eingeloggt sein, ohne ein Profil zu haben (noch im Onboarding).
*/

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile } from '../types';
import { DEFAULT_USER_PROFILE } from '../types';

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const UserContext = createContext<UserContextType | null>(null);
const PROFILE_KEY = 'lifted_user_profile';

function readStoredProfile(): UserProfile {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return DEFAULT_USER_PROFILE;

  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    localStorage.removeItem(PROFILE_KEY);
    return DEFAULT_USER_PROFILE;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(readStoredProfile);

  function updateProfile(updates: Partial<UserProfile>) {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function resetProfile() {
    localStorage.removeItem(PROFILE_KEY);
    setProfile(DEFAULT_USER_PROFILE);
  }

  return (
    <UserContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser muss innerhalb von <UserProvider> verwendet werden');
  return ctx;
}
