/*
  DashboardPage – Persönliche Startseite für eingeloggte Nutzer
  -----------------------------------------------------------------
  Warum: Das Dashboard ist der Kern-Retention-Mechanismus.
  Es zeigt den aktuellen Stand, den nächsten Schritt und macht
  es trivial, heute aktiv zu werden.
*/
import { TodayOverview } from '../components/dashboard/TodayOverview';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <TodayOverview />
      </div>
    </main>
  );
}

