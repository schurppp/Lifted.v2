/*
  QuizView – Dynamisches Feature: Interaktiver Quiz
  ---------------------------------------------------
  Dynamisches Feature #4. Nach jeder Lektion: 4 Antwortoptionen,
  sofortiges Feedback mit Erklärung.
  Warum: Sofortiges Feedback ist das Kernmerkmal von Mastery-Learning
  (Duolingo, Khan Academy). Ohne Feedback = kein Lernfortschritt.
*/
import { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import styles from './QuizView.module.css';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;  // score = 0–100
}

export function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected]     = useState<number | null>(null);
  const [answered, setAnswered]     = useState(false);
  const [correctCount, setCorrect]  = useState(0);

  const current = questions[currentIdx];
  const isLast  = currentIdx === questions.length - 1;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === current.correctIndex) setCorrect((c) => c + 1);
  }

  function handleNext() {
    if (isLast) {
      const score = Math.round(((correctCount + (selected === current.correctIndex ? 1 : 0)) / questions.length) * 100);
      onComplete(score);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  return (
    <div className={styles.wrap}>
      {/* Fortschritt */}
      <div className={styles.progressRow}>
        {questions.map((_, i) => (
          <div
            key={i}
            className={[styles.dot, i < currentIdx ? styles.dotDone : i === currentIdx ? styles.dotCurrent : ''].join(' ')}
          />
        ))}
      </div>

      {/* Frage */}
      <p className={styles.question}>{current.question}</p>

      {/* Antwortoptionen */}
      <div className={styles.options}>
        {current.options.map((option, i) => {
          let state = '';
          if (answered) {
            if (i === current.correctIndex) state = styles.correct;
            else if (i === selected)        state = styles.wrong;
          } else if (i === selected) {
            state = styles.selected;
          }

          return (
            <button
              key={i}
              className={[styles.option, state].join(' ')}
              onClick={() => handleSelect(i)}
              disabled={answered}
            >
              <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Erklärung nach Antwort */}
      {answered && (
        <div className={[styles.explanation, selected === current.correctIndex ? styles.explanationRight : styles.explanationWrong].join(' ')}>
          <p className={styles.explanationTitle}>
            {selected === current.correctIndex ? '✅ Richtig!' : '❌ Leider falsch.'}
          </p>
          <p>{current.explanation}</p>
        </div>
      )}

      {answered && (
        <Button fullWidth onClick={handleNext}>
          {isLast ? '🎉 Ergebnis sehen' : 'Nächste Frage →'}
        </Button>
      )}
    </div>
  );
}
