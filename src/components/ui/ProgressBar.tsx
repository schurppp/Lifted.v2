/*
  ProgressBar-Komponente
  -----------------------
  Warum: Sichtbarer Fortschritt ist ein Kern-Rückkehrmechanismus
  (laut Marktanalyse). Wird in Training, Lernen und Dashboard genutzt.
*/
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number;     // 0–100
  color?: string;    // CSS-Farbwert
  height?: number;   // px
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  color = 'var(--color-lime)',
  height = 8,
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrap}>
      <div
        className={styles.track}
        style={{ height }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${clamped}% abgeschlossen`}
      >
        <div
          className={styles.fill}
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{label ?? `${clamped}%`}</span>
      )}
    </div>
  );
}
