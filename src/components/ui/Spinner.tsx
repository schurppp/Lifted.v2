/*
  Spinner / Loading State
  ------------------------
  Warum: Das Skript fordert explizit Loading States.
  Dieser Spinner wird überall einheitlich verwendet.
*/
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Spinner({ size = 'md', label = 'Wird geladen…' }: SpinnerProps) {
  return (
    <div className={styles.wrap} role="status" aria-label={label}>
      <div className={[styles.spinner, styles[`spinner--${size}`]].join(' ')} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
