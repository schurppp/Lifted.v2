/*
  MobileNav – Sticky Bottom-Navigation für eingeloggte Nutzer (Mobile)
  ----------------------------------------------------------------------
  Warum: Auf dem Handy ist der Daumen unten. Diese Navigation macht
  alle 5 Hauptbereiche mit einer Hand erreichbar – Marktstandard
  für fitness-/health-Apps (Freeletics, MyFitnessPal etc.).
*/
import { NavLink } from 'react-router-dom';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
  { to: '/dashboard',   icon: '📊', label: 'Heute'      },
  { to: '/training',    icon: '🏋️', label: 'Training'   },
  { to: '/ernährung',  icon: '🥗', label: 'Essen'      },
  { to: '/lernen',      icon: '📚', label: 'Lernen'     },
  { to: '/profil',      icon: '👤', label: 'Profil'     },
];

export function MobileNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile Navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            [styles.item, isActive ? styles.itemActive : ''].join(' ')
          }
        >
          <span className={styles.icon} aria-hidden="true">{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

