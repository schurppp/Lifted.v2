/*
  RegisterPage – Account-Erstellung
  -----------------------------------
  Seite 1 des Anmelde-Flows: Name, E-Mail, Passwort.
  Nach erfolgreicher Registrierung ist der Nutzer direkt eingeloggt
  und wird zum Onboarding-Wizard weitergeleitet.
*/
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/Button';
import styles from './AuthCard.module.css';

export function RegisterPage() {
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [confirm, setConfirm]       = useState('');
  const [showPw, setShowPw]         = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [isLoading, setIsLoading]   = useState(false);

  const { register } = useAuth();
  const { updateProfile } = useUser();
  const navigate = useNavigate();

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2)
      e.name = 'Name muss mindestens 2 Zeichen haben.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Bitte eine gültige E-Mail-Adresse eingeben.';
    if (password.length < 6)
      e.password = 'Passwort muss mindestens 6 Zeichen lang sein.';
    if (password !== confirm)
      e.confirm = 'Passwörter stimmen nicht überein.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const error = await register(name.trim(), email.trim(), password);
    setIsLoading(false);

    if (error) {
      setErrors({ email: error });
      return;
    }

    // Name direkt ins UserProfile übernehmen
    updateProfile({ name: name.trim() });
    navigate('/onboarding');
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        <Link to="/" className={styles.logo}>LiftED</Link>
        <h1 className={styles.title}>Account erstellen</h1>
        <p className={styles.subtitle}>
          Kostenlos. Kein Abo. Daten bleiben auf deinem Gerät.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-name" className={styles.label}>Dein Name</label>
            <input
              id="reg-name"
              type="text"
              className={[styles.input, errors.name ? styles.inputError : ''].join(' ')}
              placeholder="Max Mustermann"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: '' })); }}
              autoComplete="name"
              autoFocus
            />
            {errors.name && <p className={styles.errorMsg} role="alert">{errors.name}</p>}
          </div>

          {/* E-Mail */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-email" className={styles.label}>E-Mail-Adresse</label>
            <input
              id="reg-email"
              type="email"
              className={[styles.input, errors.email ? styles.inputError : ''].join(' ')}
              placeholder="max@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
              autoComplete="email"
            />
            {errors.email && <p className={styles.errorMsg} role="alert">{errors.email}</p>}
          </div>

          {/* Passwort */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-pw" className={styles.label}>Passwort</label>
            <div style={{ position: 'relative' }}>
              <input
                id="reg-pw"
                type={showPw ? 'text' : 'password'}
                className={[styles.input, errors.password ? styles.inputError : ''].join(' ')}
                placeholder="Mindestens 6 Zeichen"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                autoComplete="new-password"
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                {showPw ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            {errors.password && <p className={styles.errorMsg} role="alert">{errors.password}</p>}
          </div>

          {/* Passwort bestätigen */}
          <div className={styles.fieldGroup}>
            <label htmlFor="reg-confirm" className={styles.label}>Passwort bestätigen</label>
            <input
              id="reg-confirm"
              type={showPw ? 'text' : 'password'}
              className={[styles.input, errors.confirm ? styles.inputError : ''].join(' ')}
              placeholder="Noch einmal eingeben"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((prev) => ({ ...prev, confirm: '' })); }}
              autoComplete="new-password"
            />
            {errors.confirm && <p className={styles.errorMsg} role="alert">{errors.confirm}</p>}
          </div>

          <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Account wird erstellt…' : 'Account erstellen →'}
          </Button>

        </form>

        <p className={styles.hint}>
          Bereits registriert?{' '}
          <Link to="/login" className={styles.hintLink}>Jetzt anmelden</Link>
        </p>
        <Link to="/" className={styles.backLink}>← Zurück zur Startseite</Link>
      </div>
    </div>
  );
}
