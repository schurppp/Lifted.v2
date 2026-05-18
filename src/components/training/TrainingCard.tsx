/*
  TrainingCard – Eine Trainingseinheit als expandierbare Karte
  -------------------------------------------------------------
  Warum: Die Marktanalyse empfiehlt eine Tageskarte mit
  Dauer, Fokus, Übungsliste und einem klaren "Jetzt starten"-Button.
  Expandierbar = progressive Disclosure (Details bei Bedarf).
*/
import { useState } from 'react';
import type { TrainingDay, TrainingLog } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { saveLog } from '../../storage/trainingStorage';
import styles from './TrainingCard.module.css';

interface TrainingCardProps {
  day: TrainingDay;
  planId: string;
  date: string;          // ISO date string
  isCompleted?: boolean;
  isToday?: boolean;
}

export function TrainingCard({ day, planId, date, isCompleted = false, isToday = false }: TrainingCardProps) {
  const [expanded, setExpanded]   = useState(isToday);
  const [completed, setCompleted] = useState(isCompleted);
  const [effort, setEffort]       = useState<1|2|3|4|5|undefined>();

  if (day.isRestDay) {
    return (
      <Card className={styles.restCard}>
        <span className={styles.restIcon}>😴</span>
        <div>
          <p className={styles.restLabel}>Ruhetag</p>
          <p className={styles.restHint}>{day.focus}</p>
        </div>
      </Card>
    );
  }

  function handleComplete() {
    const log: TrainingLog = { date, planId, dayIndex: day.dayIndex, completed: true, perceivedEffort: effort };
    saveLog(log);
    setCompleted(true);
  }

  return (
    <Card
      className={[styles.card, isToday ? styles.cardToday : '', completed ? styles.cardDone : ''].join(' ')}
      accent={completed ? 'var(--color-green)' : isToday ? 'var(--color-lime)' : undefined}
    >
      {/* Header – immer sichtbar */}
      <div className={styles.header} onClick={() => setExpanded((e) => !e)}>
        <div className={styles.meta}>
          <span className={styles.label}>{day.label}</span>
          <p className={styles.focus}>{day.focus}</p>
        </div>
        <div className={styles.headerRight}>
          <Badge color={completed ? 'green' : isToday ? 'lime' : 'slate'}>
            {completed ? '✓ Erledigt' : `${day.durationMinutes} Min`}
          </Badge>
          <span className={styles.chevron}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Detail-Inhalt – nur wenn expandiert */}
      {expanded && (
        <div className={styles.detail}>
          <ul className={styles.exerciseList}>
            {day.exercises.map((ex) => (
              <li key={ex.id} className={styles.exercise}>
                <div className={styles.exerciseName}>{ex.name}</div>
                <div className={styles.exerciseMeta}>
                  <span>{ex.sets} × {ex.reps}</span>
                  <span className={styles.rest}>{ex.restSeconds}s Pause</span>
                  <Badge color="slate">{ex.muscleGroup}</Badge>
                </div>
                {ex.notes && <p className={styles.exerciseNote}>{ex.notes}</p>}
              </li>
            ))}
          </ul>

          {/* Effort-Bewertung */}
          {!completed && (
            <div className={styles.effortWrap}>
              <p className={styles.effortLabel}>Wie war die Einheit? (RPE)</p>
              <div className={styles.effortBtns}>
                {([1,2,3,4,5] as const).map((n) => (
                  <button
                    key={n}
                    className={[styles.effortBtn, effort === n ? styles.effortBtnActive : ''].join(' ')}
                    onClick={() => setEffort(n)}
                    aria-label={`RPE ${n}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <Button fullWidth onClick={handleComplete}>
                ✓ Einheit abschließen
              </Button>
            </div>
          )}

          {completed && (
            <p className={styles.doneMsg}>
              ✅ Geschafft! Erholung ist genauso wichtig wie das Training selbst.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
