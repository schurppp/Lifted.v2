/*
  ModuleCard – Lernmodul-Übersichtskarte
  ----------------------------------------
  Zeigt Titel, Fortschritt und "Weitermachen"-CTA.
  Warum onSelect statt Link: LearningPage verwaltet Navigation intern über
  State (view: overview | module | lesson | quiz | result). Ein <Link> würde
  zu /lernen/:id routen, das nicht existiert. onSelect() ruft stattdessen
  openModule() in der LearningPage auf.
*/
import type { LearningModule } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { getModuleProgress } from '../../storage/learningStorage';
import styles from './ModuleCard.module.css';

interface ModuleCardProps {
  module: LearningModule;
  onSelect: () => void;   // Callback statt Route-Navigation
}

export function ModuleCard({ module, onSelect }: ModuleCardProps) {
  const progress = getModuleProgress(module.id);

  return (
    <article className={styles.card} style={{ borderTop: `4px solid ${module.color}` }}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">{module.icon}</span>
        <div>
          <h3 className={styles.title}>{module.title}</h3>
          <p className={styles.desc}>{module.description}</p>
        </div>
      </div>

      {/* Fortschritt */}
      <div className={styles.progress}>
        <ProgressBar value={progress} color={module.color} showLabel label={`${progress}% abgeschlossen`} />
        <p className={styles.progressMeta}>
          {module.totalLessons} Lektionen · ~{module.estimatedHours}h Lernzeit
        </p>
      </div>

      {/* CTA – button statt Link, damit LearningPage State-Navigation kontrolliert */}
      <button
        type="button"
        className={styles.cta}
        style={{ background: module.color, color: module.color === '#B7F000' ? '#0B1220' : '#fff' }}
        onClick={onSelect}
      >
        {progress === 0 ? 'Lernpfad starten →' : progress === 100 ? '✓ Abgeschlossen' : 'Weitermachen →'}
      </button>
    </article>
  );
}
