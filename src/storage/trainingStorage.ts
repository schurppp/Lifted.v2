/*
  Training Service
  -----------------
  Kapselt die Logik rund um Trainingspläne und -logs.
  Warum: Komponenten sollen keine Geschäftslogik enthalten –
  die Frage "Welcher Plan passt zu diesem Nutzer?" gehört in den Service.
*/

import { TRAINING_PLANS } from '../data/trainingPlans';
import type { TrainingPlan, TrainingLog, FitnessLevel, Goal } from '../types';

const STORAGE_KEY = 'lifted_training_logs';

/** Alle Pläne */
export function getAllPlans(): TrainingPlan[] {
  return TRAINING_PLANS;
}

/** Plan per ID */
export function getPlanById(id: string): TrainingPlan | undefined {
  return TRAINING_PLANS.find((p) => p.id === id);
}

/** Plan nach Level und Ziel empfehlen */
export function recommendPlan(level: FitnessLevel, goal: Goal): TrainingPlan {
  // Passenden Plan suchen
  const match = TRAINING_PLANS.find(
    (p) => p.level === level && p.goals.includes(goal)
  );

  // Fallback: Erster passender nach Level, dann Full Body für Einsteiger
  return match
    ?? TRAINING_PLANS.find((p) => p.level === level)
    ?? TRAINING_PLANS[0]; // Full Body als sicherer Default
}

// ─── Training Logs (localStorage) ────────────────────────────────────────────
/*
  Warum localStorage: Kein Server erlaubt (Skript). LocalStorage ermöglicht
  Persistenz über Browser-Sessions hinweg ohne Backend.
*/

export function getLogs(): TrainingLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrainingLog[]) : [];
  } catch {
    return [];
  }
}

export function saveLog(log: TrainingLog): void {
  const logs = getLogs();
  // Existierenden Eintrag für denselben Tag ersetzen, sonst anhängen
  const idx = logs.findIndex((l) => l.date === log.date && l.planId === log.planId);
  if (idx >= 0) {
    logs[idx] = log;
  } else {
    logs.push(log);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

/** Wie viele Einheiten wurden diese Woche abgeschlossen? */
export function getWeeklyCompletionCount(): number {
  const logs = getLogs();
  const now = new Date();
  // Montag dieser Woche berechnen
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  return logs.filter((l) => {
    const date = new Date(l.date);
    return date >= monday && l.completed;
  }).length;
}

/** Aktueller Streak (aufeinanderfolgende Trainingstage) */
export function getCurrentStreak(): number {
  const logs = getLogs().filter((l) => l.completed);
  if (logs.length === 0) return 0;

  const sortedDates = [...new Set(logs.map((l) => l.date.substring(0, 10)))]
    .sort()
    .reverse();

  let streak = 0;
  const today = new Date().toISOString().substring(0, 10);
  let current = today;

  for (const date of sortedDates) {
    if (date === current) {
      streak++;
      // Vortag berechnen
      const d = new Date(current);
      d.setDate(d.getDate() - 1);
      current = d.toISOString().substring(0, 10);
    } else {
      break;
    }
  }
  return streak;
}
