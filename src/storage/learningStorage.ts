/*
  Learning Service
  -----------------
  Verwaltet Module, Lektionen und Fortschritt.
  Warum: Lernfortschritt muss persistent sein – der Nutzer soll dort
  weitermachen, wo er aufgehört hat.
*/

import { LEARNING_MODULES } from '../data/learningModules';
import type { LearningModule, LearningProgress, SubjectArea } from '../types';

const STORAGE_KEY = 'lifted_learning_progress';

/** Alle Module */
export function getAllModules(): LearningModule[] {
  return LEARNING_MODULES;
}

/** Modul per ID */
export function getModuleById(id: string): LearningModule | undefined {
  return LEARNING_MODULES.find((m) => m.id === id);
}

/** Module nach Fachbereich filtern */
export function getModulesBySubject(subject: SubjectArea): LearningModule[] {
  return LEARNING_MODULES.filter((m) => m.subject === subject);
}

// ─── Fortschritts-Persistenz ─────────────────────────────────────────────────

export function getAllProgress(): LearningProgress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LearningProgress[]) : [];
  } catch {
    return [];
  }
}

export function getProgressForModule(moduleId: string): LearningProgress {
  const all = getAllProgress();
  return (
    all.find((p) => p.moduleId === moduleId) ?? {
      moduleId,
      completedLessonIds: [],
      quizScores: {},
    }
  );
}

export function saveProgress(progress: LearningProgress): void {
  const all = getAllProgress();
  const idx = all.findIndex((p) => p.moduleId === progress.moduleId);
  if (idx >= 0) {
    all[idx] = { ...progress, lastStudiedAt: new Date().toISOString() };
  } else {
    all.push({ ...progress, lastStudiedAt: new Date().toISOString() });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function markLessonComplete(moduleId: string, lessonId: string, score: number): void {
  const progress = getProgressForModule(moduleId);
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
  }
  progress.quizScores[lessonId] = score;
  saveProgress(progress);
}

/** Gesamtfortschritt eines Moduls in Prozent */
export function getModuleProgress(moduleId: string): number {
  const module = getModuleById(moduleId);
  if (!module || module.totalLessons === 0) return 0;

  const progress = getProgressForModule(moduleId);
  return Math.round((progress.completedLessonIds.length / module.totalLessons) * 100);
}
