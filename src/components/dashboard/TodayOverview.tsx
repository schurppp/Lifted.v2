/*
  TodayOverview – Herzstück des Dashboards
  ------------------------------------------
  Zeigt dem eingeloggten Nutzer seinen heutigen Plan auf einen Blick.
  Warum: "Nächster sinnvoller Schritt" – das stärkste Retention-Feature
  laut Marktanalyse. Der Nutzer muss nicht suchen, was er heute tun soll.
*/
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { recommendPlan, getWeeklyCompletionCount, getCurrentStreak } from '../../storage/trainingStorage';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import styles from './TodayOverview.module.css';

export function TodayOverview() {
  const { profile } = useUser();
  const today = new Date();
  const dayIndex = (today.getDay() + 6) % 7; // 0 = Montag
  const plan = recommendPlan(profile.level, profile.goal);
  const todayTraining = plan.days[dayIndex % plan.days.length];
  const weeklyCount = getWeeklyCompletionCount();
  const streak = getCurrentStreak();

  const weekDay = today.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className={styles.wrap}>
      {/* Begrüßung */}
      <div className={styles.greeting}>
        <h1 className={styles.greetingTitle}>
          Guten {getGreeting()}, {profile.name} 👋
        </h1>
        <p className={styles.date}>{weekDay}</p>
      </div>

      {/* Stat-Karten */}
      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <p className={styles.statValue} style={{ color: 'var(--color-lime)' }}>{streak}</p>
          <p className={styles.statLabel}>Tage Streak 🔥</p>
        </Card>
        <Card className={styles.statCard}>
          <p className={styles.statValue} style={{ color: 'var(--color-teal)' }}>{weeklyCount}/{profile.daysPerWeek}</p>
          <p className={styles.statLabel}>Einheiten diese Woche</p>
        </Card>
        <Card className={styles.statCard}>
          <p className={styles.statValue} style={{ color: 'var(--color-orange)' }}>{plan.shortName}</p>
          <p className={styles.statLabel}>Dein Plan</p>
        </Card>
      </div>

      {/* Wochenfortschritt */}
      <Card>
        <p className={styles.sectionLabel}>Wochenfortschritt</p>
        <ProgressBar
          value={Math.round((weeklyCount / profile.daysPerWeek) * 100)}
          color="var(--color-lime)"
          height={10}
          showLabel
          label={`${weeklyCount} von ${profile.daysPerWeek} Einheiten`}
        />
      </Card>

      {/* Heutige Einheit */}
      <Card accent={todayTraining.isRestDay ? undefined : 'var(--color-lime)'}>
        <p className={styles.sectionLabel}>Heute</p>
        {todayTraining.isRestDay ? (
          <div className={styles.restDay}>
            <span className={styles.restIcon}>😴</span>
            <div>
              <p className={styles.restTitle}>Ruhetag</p>
              <p className={styles.restDesc}>Erholung ist Teil des Trainings. Dein Körper wächst in der Pause.</p>
            </div>
          </div>
        ) : (
          <div className={styles.todaySession}>
            <div>
              <p className={styles.sessionTitle}>{todayTraining.label}</p>
              <p className={styles.sessionMeta}>{todayTraining.durationMinutes} Min · {todayTraining.focus}</p>
              <p className={styles.sessionExCount}>{todayTraining.exercises.length} Übungen</p>
            </div>
            <Link to="/training" className={styles.startBtn}>
              Jetzt starten →
            </Link>
          </div>
        )}
      </Card>

      {/* Schnellzugriff */}
      <div className={styles.quickLinks}>
        <Link to="/ernährung" className={styles.quickLink} style={{ background: '#F0FDFB', borderColor: 'var(--color-teal)' }}>
          <span>🥗</span>
          <span>Rezepte</span>
        </Link>
        <Link to="/lernen" className={styles.quickLink} style={{ background: '#FFFBEB', borderColor: 'var(--color-amber)' }}>
          <span>📚</span>
          <span>Lernen</span>
        </Link>
        <Link to="/fortschritt" className={styles.quickLink} style={{ background: '#F0FDF4', borderColor: 'var(--color-green)' }}>
          <span>📈</span>
          <span>Fortschritt</span>
        </Link>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Morgen';
  if (h < 18) return 'Tag';
  return 'Abend';
}

