/*
  NotFoundPage – 404-Seite
  -------------------------
  Warum explizit gefordert: Das DHBW-Skript verlangt eine 404-Seite.
  Nutzer, die auf eine ungültige URL navigieren, sollen eine freundliche
  Fehlermeldung sehen und leicht zurückfinden – kein leerer Bildschirm.
  useNavigate(-1) ermöglicht Zurück-Navigation ohne History-Verlust.
*/
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* ── Große 404-Anzeige ──────────────────────────────────── */}
        <div className={styles.code}>
          <span className={styles.four}>4</span>
          <span className={styles.zero}>0</span>
          <span className={styles.four}>4</span>
        </div>

        <h1 className={styles.title}>Seite nicht gefunden</h1>
        <p className={styles.text}>
          Diese URL existiert nicht – vielleicht wurde sie umgezogen
          oder du hast dich vertippt. Kein Stress, wir bringen dich zurück.
        </p>

        {/* ── Navigation-Optionen ────────────────────────────────── */}
        <div className={styles.actions}>
          <Button variant="primary" onClick={() => navigate('/')}>
            Zur Startseite
          </Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Zurück
          </Button>
        </div>

        {/* ── Schnelllinks ──────────────────────────────────────── */}
        <div className={styles.quickLinks}>
          <p className={styles.quickLinksLabel}>Vielleicht suchst du:</p>
          <div className={styles.linkGrid}>
            {[
              { href: '/dashboard',  label: '🏠 Dashboard'        },
              { href: '/training',   label: '💪 Training'          },
              { href: '/ernährung', label: '🥗 Ernährung'         },
              { href: '/lernen',     label: '📚 Lernen'            },
              { href: '/fortschritt', label: '📊 Fortschritt'      },
            ].map((link) => (
              <button
                key={link.href}
                type="button"
                className={styles.quickLink}
                onClick={() => navigate(link.href)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

