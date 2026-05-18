/*
  Footer – Nur auf öffentlichen Seiten sichtbar
  -----------------------------------------------
  Warum kein Footer in der App: Eingeloggte Nutzer navigieren
  über Header und MobileNav. Ein Footer wäre hier nur störend.
*/
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>LiftED</span>
          <p className={styles.tagline}>Training. Ernährung. Lernen.<br />Dein persönliches Betriebssystem.</p>
        </div>

        <nav className={styles.links} aria-label="Footer-Navigation">
          <div className={styles.col}>
            <p className={styles.colTitle}>Bereiche</p>
            <Link to="/trainingplaene">Trainingspläne</Link>
            <Link to="/ernaehrung-info">Ernährung</Link>
            <Link to="/lernen-info">Lernen</Link>
          </div>
          <div className={styles.col}>
            <p className={styles.colTitle}>Über LiftED</p>
            <Link to="/so-funktionierts">Methode</Link>
            <Link to="/register">Plan erstellen</Link>
          </div>
          <div className={styles.col}>
            <p className={styles.colTitle}>Konto</p>
            <Link to="/login">Anmelden</Link>
            <Link to="/register">Registrieren</Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} LiftED · DHBW Business Engineering 2026 · Kein kommerzielles Angebot</p>
      </div>
    </footer>
  );
}

