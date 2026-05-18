/*
  TrainingPage – Trainingsplan-Seite
  ------------------------------------
  Dynamisches Feature: Plan-Selektion + Wochenansicht + Tageskarten.
  Nutzer sieht seine gesamte Woche auf einen Blick und kann einzelne
  Einheiten starten, loggen und abschliessen.
*/
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { getAllPlans, recommendPlan } from '../storage/trainingStorage';
import { TrainingCard } from '../components/training/TrainingCard';
import { EmptyState } from '../components/ui/EmptyState';
import styles from './TrainingPage.module.css';

const WEEK_DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export function TrainingPage() {
  const { profile } = useUser();
  const allPlans     = getAllPlans();
  const recommended  = recommendPlan(profile.level, profile.goal);

  const [activePlanId, setActivePlanId] = useState(recommended.id);
  const activePlan = allPlans.find((p) => p.id === activePlanId) ?? recommended;

  // Heutiger Wochentag als Index (0 = Montag)
  const todayIndex = (new Date().getDay() + 6) % 7;
  const todayDate  = new Date().toISOString().substring(0, 10);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Trainingsplan</h1>
            <p className={styles.sub}>
              Empfehlung für dein Ziel ({profile.goal}): <strong>{recommended.name}</strong>
            </p>
          </div>
        </div>

        {/* Plan-Selector */}
        <div className={styles.planSelector}>
          {allPlans.map((plan) => (
            <button
              key={plan.id}
              className={[styles.planTab, activePlanId === plan.id ? styles.planTabActive : ''].join(' ')}
              onClick={() => setActivePlanId(plan.id)}
            >
              <span className={styles.planShort}>{plan.shortName}</span>
              <span className={styles.planName}>{plan.name}</span>
              <span className={styles.planMeta}>{plan.daysPerWeek}x / Woche · {plan.level}</span>
            </button>
          ))}
        </div>

        {/* Plan-Info */}
        <div className={styles.planInfo}>
          <p className={styles.planDesc}>{activePlan.description}</p>
          <p className={styles.planMeta2}>{activePlan.totalWeeks} Wochen · Level: {activePlan.level}</p>
        </div>

        {/* Wochenansicht */}
        <div className={styles.weekNav}>
          {WEEK_DAYS.map((day, i) => {
            const planDay = activePlan.days[i % activePlan.days.length];
            const isToday = i === todayIndex;
            const isRest  = planDay.isRestDay;
            return (
              <div
                key={day}
                className={[
                  styles.weekDay,
                  isToday ? styles.weekDayToday : '',
                  isRest  ? styles.weekDayRest  : '',
                ].join(' ')}
              >
                <span className={styles.weekDayLabel}>{day}</span>
                {isToday && <span className={styles.todayDot} />}
                <span className={styles.weekDayType}>{isRest ? 'Pause' : planDay.label}</span>
              </div>
            );
          })}
        </div>

        {/* Tageskarten */}
        {activePlan.days.length === 0 ? (
          <EmptyState icon="🏋️" title="Keine Einheiten gefunden" description="Bitte wähle einen anderen Plan." />
        ) : (
          <div className={styles.dayCards}>
            {activePlan.days.map((day, i) => (
              <div key={day.dayIndex} className={styles.dayCardWrap}>
                <p className={styles.dayLabel}>{WEEK_DAYS[i % 7]}</p>
                <TrainingCard
                  day={day}
                  planId={activePlan.id}
                  date={todayDate}
                  isToday={i === todayIndex}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

