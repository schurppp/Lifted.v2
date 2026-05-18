/*
  PublicHeader – Navigation für nicht-eingeloggte Nutzer
  -------------------------------------------------------
  Warum zwei verschiedene Header: Die öffentliche Seite muss überzeugen
  (Trainingspläne, Ernährung, Lernen, CTA "Kostenlos starten").
  Die eingeloggte App braucht andere Links (Dashboard, Plan, etc.).
  Klare Trennung = keine Konditionslogik im Header.
*/
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import styles from './PublicHeader.module.css';

const NAV_LINKS = [
  { to: '/trainingspläne',   label: 'Training'    },
  { to: '/ernährung-info',  label: 'Ernährung'   },
  { to: '/lernen-info',      label: 'Lernen'       },
  { to: '/so-funktionierts', label: 'Methode'      },
];

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="LiftED Startseite">
          LiftED
        </Link>

        {/* Desktop-Navigation */}
        <nav className={styles.nav} aria-label="Hauptnavigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA-Bereich */}
        <div className={styles.actions}>
          <Link to="/login" className={styles.loginLink}>Anmelden</Link>
          <Button
            size="sm"
            onClick={() => { window.location.href = '/register'; }}
          >
            Kostenlos starten
          </Button>
        </div>

        {/* Burger-Menü für Mobile */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Navigation öffnen"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile-Menü */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/register" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
            Kostenlos starten →
          </Link>
        </nav>
      )}
    </header>
  );
}

