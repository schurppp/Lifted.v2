/*
  ErrorState-Komponente
  ----------------------
  Warum: Das Skript fordert Error States. Fehlermeldungen müssen
  dem Nutzer klar kommunizieren, was falsch gelaufen ist
  und was er tun kann. Keine leeren Screens ohne Erklärung.
*/
import { Button } from './Button';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Etwas ist schiefgelaufen',
  message = 'Die Daten konnten nicht geladen werden.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={styles.wrap} role="alert">
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>
          Erneut versuchen
        </Button>
      )}
    </div>
  );
}
