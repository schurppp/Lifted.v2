/*
  Badge-Komponente
  -----------------
  Kleine Labels für Tags, Status, Ziele etc.
*/
import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeColor = 'lime' | 'orange' | 'teal' | 'green' | 'amber' | 'slate' | 'navy';

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
}

export function Badge({ children, color = 'slate' }: BadgeProps) {
  return <span className={[styles.badge, styles[`badge--${color}`]].join(' ')}>{children}</span>;
}
