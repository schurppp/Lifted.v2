/*
  LearningPage – Lernmodul-Übersicht und Lernpfad
  --------------------------------------------------
  Zeigt alle Module mit Fortschritt und navigiert in einzelne Lektionen.
  Wenn eine Lektion geöffnet wird, zeigt sie den Inhalt + Quiz in einem
  Step-by-step Ablauf.
*/
import { useState } from 'react';
import { getAllModules, getProgressForModule, markLessonComplete } from '../storage/learningStorage';
import { ModuleCard } from '../components/learning/ModuleCard';
import { QuizView } from '../components/learning/QuizView';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { LearningModule, Lesson } from '../types';
import styles from './LearningPage.module.css';

type View = 'overview' | 'module' | 'lesson' | 'quiz' | 'result';

export function LearningPage() {
  const modules = getAllModules();
  const [view, setView]           = useState<View>('overview');
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quizScore, setQuizScore]       = useState<number | null>(null);
  const [lessonPhase, setLessonPhase]   = useState<'content' | 'quiz'>('content');

  function openModule(mod: LearningModule) {
    setActiveModule(mod);
    setView('module');
  }

  function openLesson(lesson: Lesson) {
    setActiveLesson(lesson);
    setLessonPhase('content');
    setView('lesson');
  }

  function handleQuizComplete(score: number) {
    if (activeModule && activeLesson) {
      markLessonComplete(activeModule.id, activeLesson.id, score);
      setQuizScore(score);
      setView('result');
    }
  }

  function backToModule() {
    setView('module');
    setActiveLesson(null);
    setQuizScore(null);
  }

  function backToOverview() {
    setView('overview');
    setActiveModule(null);
  }

  // ── UEBERSICHT ────────────────────────────────────────────────────────────
  if (view === 'overview') {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Lernen</h1>
          <p className={styles.sub}>Mikro-Lernmodule für Mathe, Programmierung und Rechnungslegung.</p>
          <div className={styles.modulesGrid}>
            {modules.map((mod) => (
              <ModuleCard key={mod.id} module={mod} onSelect={() => openModule(mod)} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── MODUL-DETAIL ──────────────────────────────────────────────────────────
  if (view === 'module' && activeModule) {
    const progress  = getProgressForModule(activeModule.id);
    const modProgress = Math.round((progress.completedLessonIds.length / activeModule.totalLessons) * 100);

    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={backToOverview}>&larr; Alle Module</button>
          <div style={{ borderTop: `4px solid ${activeModule.color}`, padding: 'var(--space-5)', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: 'var(--space-4)' }}>
            <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: '8px' }}>
              {activeModule.icon} {activeModule.title}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>{activeModule.description}</p>
            <ProgressBar value={modProgress} color={activeModule.color} showLabel label={`${modProgress}% abgeschlossen`} />
          </div>

          <div className={styles.lessonList}>
            {activeModule.lessons.map((lesson, i) => {
              const isDone = progress.completedLessonIds.includes(lesson.id);
              const score  = progress.quizScores[lesson.id];
              return (
                <button key={lesson.id} className={[styles.lessonRow, isDone ? styles.lessonDone : ''].join(' ')} onClick={() => openLesson(lesson)}>
                  <span className={styles.lessonNumber}>{i + 1}</span>
                  <div className={styles.lessonMeta}>
                    <p className={styles.lessonTitle}>{lesson.title}</p>
                    <p className={styles.lessonInfo}>{lesson.durationMinutes} Min · {lesson.quiz.length} Quizfragen</p>
                  </div>
                  <div className={styles.lessonStatus}>
                    {isDone ? (
                      <span style={{ color: 'var(--color-green)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                        OK {score}%
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-orange)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>Starten</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // ── LEKTION: INHALT ───────────────────────────────────────────────────────
  if (view === 'lesson' && activeLesson) {
    return (
      <main className={styles.page}>
        <div className={styles.containerNarrow}>
          <button className={styles.backBtn} onClick={backToModule}>&larr; Zurück</button>
          <div className={styles.lessonContent}>
            <div className={styles.lessonHeader}>
              <p className={styles.lessonDuration}>{activeLesson.durationMinutes} Min Lernzeit</p>
              <h1 className={styles.lessonBigTitle}>{activeLesson.title}</h1>
            </div>
            <div className={styles.lessonText}>
              {activeLesson.content.split('\n\n').map((para, i) => (
                <p key={i} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>{para}</p>
              ))}
            </div>
            <Button fullWidth onClick={() => setLessonPhase('quiz')}>
              Zum Quiz &rarr;
            </Button>
          </div>

          {lessonPhase === 'quiz' && (
            <div className={styles.quizOverlay}>
              <div className={styles.quizCard}>
                <h2 style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, marginBottom: 'var(--space-5)' }}>Quiz: {activeLesson.title}</h2>
                <QuizView questions={activeLesson.quiz} onComplete={handleQuizComplete} />
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ── ERGEBNIS ──────────────────────────────────────────────────────────────
  if (view === 'result') {
    return (
      <main className={styles.page}>
        <div className={styles.containerNarrow}>
          <div className={styles.resultCard}>
            <span className={styles.resultIcon}>{(quizScore ?? 0) >= 70 ? 'PASS' : 'MISS'}</span>
            <h2 className={styles.resultTitle}>
              {(quizScore ?? 0) >= 70 ? 'Super gemacht!' : 'Weiter üben!'}
            </h2>
            <p className={styles.resultScore}>{quizScore}% richtig</p>
            <p className={styles.resultDesc}>
              {(quizScore ?? 0) >= 70
                ? 'Du hast die Lektion abgeschlossen. Der Fortschritt wurde gespeichert.'
                : 'Kein Problem – lese den Inhalt nochmal durch und versuche es erneut.'}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <Button onClick={backToModule}>Zurück zum Modul</Button>
              <Button variant="ghost" onClick={() => { setLessonPhase('content'); setView('lesson'); setQuizScore(null); }}>
                Lektion wiederholen
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}

