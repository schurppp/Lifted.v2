/*
  AppHeader – Navigation für eingeloggte Nutzer
  -----------------------------------------------
  Warum: Eingeloggte Nutzer brauchen schnellen Zugriff auf
  Dashboard, Wochenplan, Profil. Kein Marketing mehr nötig.
  Logout-Funktion sichtbar aber nicht prominent.
*/
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AppHeader.module.css';

const APP_NAV = [
  { to: '/dashboard',  label: '📊 Heute'    },
  { to: '/training',   label: '🏋️ Training'  },
  { to: '/ernährung', label: '🥗 Ernährung' },
  { to: '/lernen',     label: '📚 Lernen'    },
  { to: '/fortschritt',label: '📈 Fortschritt'},
];

export function AppHeader() {
  const { logout, userName } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/dashboard" className={styles.logo}>LiftED</Link>

        <nav className={styles.nav} aria-label="App-Navigation">
          {APP_NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.linkActive : ''].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.user}>
          <Link to="/profil" className={styles.userName} title="Profil bearbeiten">
            👤 {userName}
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout} aria-label="Abmelden">
            Abmelden
          </button>
        </div>
      </div>
    </header>
  );
}

