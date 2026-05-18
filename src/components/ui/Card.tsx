/*
  Card-Komponente
  ----------------
  Grundbaustein für alle Inhalts-Karten in LiftED.
  Warum: Konsistenter Rahmen, Radius und Schatten überall.
*/
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  accent?: string; // CSS-Farbwert für die linke Akzentlinie
}

export function Card({ children, padding = 'md', accent, className = '', style, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={[styles.card, styles[`card--${padding}`], className].filter(Boolean).join(' ')}
      style={{
        ...style,
        borderLeft: accent ? `4px solid ${accent}` : undefined,
      }}
    >
      {children}
    </div>
  );
}
