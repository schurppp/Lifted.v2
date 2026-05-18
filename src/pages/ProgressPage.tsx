/*
  ProgressPage - Wöchentlicher Rückblick & Statistiken
  -------------------------------------------------------
  Verwendet die vorhandenen Services für Training und Lernen, ohne eigene
  localStorage-Zugriffe in der Page.
*/
import { useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import {
  getLogs,
  getCurrentStreak,
  getWeeklyCompletionCount,
  getAllPlans,
  getPlanById,
  recommendPlan,
} from '../storage/trainingStorage';
import { LEARNING_MODULES as learningModules } from '../data/learningModules';
import { getModuleProgress } from '../storage/learningStorage';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import type { Goal, FitnessLevel } from '../types';
import styles from './ProgressPage.module.css';

function getLast7Days(): string[] {
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  return Array.from({ length: 7 }, (_, index) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - index));
    return days[d.getDay()];
  });
}

function dateOffset(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export function ProgressPage() {
  const { profile } = useUser();

  const logs = useMemo(() => getLogs(), []);
  const streak = getCurrentStreak();
  const weeklyCount = getWeeklyCompletionCount();

  const allPlans = getAllPlans();
  const recommendedPlan = useMemo(
    () => recommendPlan(profile.level, profile.goal),
    [profile.level, profile.goal]
  );
  const plannedDaysPerWeek = recommendedPlan.daysPerWeek;

  const last7Labels = getLast7Days();
  const last7Dates = Array.from({ length: 7 }, (_, i) => dateOffset(6 - i));
  const completedDates = new Set(
    logs.filter((log) => log.completed).map((log) => log.date.substring(0, 10))
  );

  const totalWorkouts = logs.filter((log) => log.completed).length;
  const moduleProgresses = learningModules.map((module) => ({
    id: module.id,
    title: module.title,
    icon: module.icon,
    progress: getModuleProgress(module.id),
  }));
  const avgLearningProgress = moduleProgresses.length
    ? moduleProgresses.reduce((sum, module) => sum + module.progress, 0) / moduleProgresses.length
    : 0;
  const weeklyPercent = Math.round((weeklyCount / Math.max(plannedDaysPerWeek, 1)) * 100);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Dein Fortschritt</h1>
          <p className={styles.subtitle}>
            Ziel: <strong>{goalLabel(profile.goal)}</strong> Â· Level:{' '}
            <strong>{levelLabel(profile.level)}</strong>
          </p>
        </div>

        <div className={styles.kpiGrid}>
          <StatCard value={streak} label="Tage Streak" sublabel="aktuell" accent="lime" icon="ST" />
          <StatCard
            value={weeklyCount}
            label={`/ ${plannedDaysPerWeek} diese Woche`}
            sublabel="Trainings absolviert"
            accent="orange"
            icon="WO"
          />
          <StatCard value={totalWorkouts} label="Trainings gesamt" sublabel="seit Start" accent="teal" icon="TR" />
          <StatCard
            value={`${Math.round(avgLearningProgress)}%`}
            label="Lernfortschritt"
            sublabel="Durchschnitt"
            accent="green"
            icon="LE"
          />
        </div>

        <Card className={styles.weekCard}>
          <div className={styles.weekHeader}>
            <span className={styles.weekTitle}>Wochenziel</span>
            <Badge color={weeklyPercent >= 100 ? 'lime' : weeklyPercent >= 50 ? 'orange' : 'slate'}>
              {weeklyCount} / {plannedDaysPerWeek} Trainings
            </Badge>
          </div>
          <ProgressBar
            value={Math.min(weeklyPercent, 100)}
            color={weeklyPercent >= 100 ? 'var(--color-lime)' : weeklyPercent >= 50 ? 'var(--color-orange)' : 'var(--color-slate)'}
            height={12}
          />
          <p className={styles.weekHint}>
            {weeklyPercent >= 100
              ? 'Wochenziel erreicht. Stark.'
              : `Noch ${Math.max(plannedDaysPerWeek - weeklyCount, 0)} Training(s) bis zum Wochenziel.`}
          </p>
        </Card>

        <Card className={styles.heatmapCard}>
          <h2 className={styles.sectionTitle}>Die letzten 7 Tage</h2>
          <div className={styles.heatmap}>
            {last7Dates.map((date, idx) => {
              const done = completedDates.has(date);
              return (
                <div key={date} className={styles.heatmapDay}>
                  <div
                    className={[
                      styles.heatmapDot,
                      done ? styles.heatmapDotDone : styles.heatmapDotEmpty,
                    ].join(' ')}
                    title={date}
                  >
                    {done ? 'OK' : ''}
                  </div>
                  <span className={styles.heatmapLabel}>{last7Labels[idx]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className={styles.bottomGrid}>
          <Card className={styles.historyCard}>
            <h2 className={styles.sectionTitle}>Letzte Trainings</h2>
            {logs.length === 0 ? (
              <p className={styles.emptyHint}>Noch kein Training geloggt. Los geht's!</p>
            ) : (
              <ul className={styles.logList}>
                {[...logs]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 6)
                  .map((log) => {
                    const plan = getPlanById(log.planId);
                    const trainingDay = plan?.days.find((day) => day.dayIndex === log.dayIndex);
                    return (
                      <li key={`${log.date}-${log.planId}-${log.dayIndex}`} className={styles.logItem}>
                        <span className={styles.logDate}>{formatDate(log.date)}</span>
                        <span className={styles.logPlan}>{plan?.name ?? log.planId}</span>
                        <span className={styles.logDay}>{trainingDay?.label ?? `Tag ${log.dayIndex + 1}`}</span>
                        {log.perceivedEffort && (
                          <Badge color={rpeColor(log.perceivedEffort)}>RPE {log.perceivedEffort}</Badge>
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </Card>

          <Card className={styles.learningCard}>
            <h2 className={styles.sectionTitle}>Lernmodule</h2>
            <div className={styles.moduleList}>
              {moduleProgresses.map((module) => (
                <div key={module.id} className={styles.moduleRow}>
                  <span className={styles.moduleEmoji}>{module.icon}</span>
                  <div className={styles.moduleInfo}>
                    <span className={styles.moduleTitle}>{module.title}</span>
                    <ProgressBar value={module.progress} height={6} />
                  </div>
                  <span className={styles.modulePercent}>{module.progress}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className={styles.plansCard}>
          <h2 className={styles.sectionTitle}>Verfügbare Pläne</h2>
          <div className={styles.planGrid}>
            {allPlans.map((plan) => (
              <div
                key={plan.id}
                className={[
                  styles.planItem,
                  plan.id === recommendedPlan.id ? styles.planItemActive : '',
                ].join(' ')}
              >
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planMeta}>{plan.daysPerWeek}x/Woche Â· {levelLabel(plan.level)}</div>
                {plan.id === recommendedPlan.id && <Badge color="lime">Dein Plan</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  sublabel,
  accent,
  icon,
}: {
  value: string | number;
  label: string;
  sublabel: string;
  accent: 'lime' | 'orange' | 'teal' | 'green';
  icon: string;
}) {
  return (
    <div className={[styles.kpiCard, styles[`kpi_${accent}`]].join(' ')}>
      <span className={styles.kpiIcon}>{icon}</span>
      <span className={styles.kpiValue}>{value}</span>
      <span className={styles.kpiLabel}>{label}</span>
      <span className={styles.kpiSublabel}>{sublabel}</span>
    </div>
  );
}

function goalLabel(goal: Goal): string {
  const map: Record<Goal, string> = {
    muscle: 'Muskeln aufbauen',
    'fat-loss': 'Fettabbau',
    recomp: 'Body Recomp',
    health: 'Gesundheit',
    knowledge: 'Wissen aufbauen',
  };
  return map[goal];
}

function levelLabel(level: FitnessLevel): string {
  const map: Record<FitnessLevel, string> = {
    beginner: 'Einsteiger',
    intermediate: 'Fortgeschritten',
    advanced: 'Profi',
  };
  return map[level];
}

function rpeColor(rpe: number): 'lime' | 'orange' | 'amber' | 'slate' {
  if (rpe <= 2) return 'lime';
  if (rpe <= 3) return 'amber';
  if (rpe <= 4) return 'orange';
  return 'slate';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

