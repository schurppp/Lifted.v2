/*
  LoginPage – E-Mail + Passwort Login
  -------------------------------------
  Prüft Credentials gegen den accountStorage (localStorage-DB).
  Bekannte Nutzer (onboardingCompleted) kommen ins Dashboard,
  neue Nutzer zum Onboarding.
*/
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/Button';
import styles from './AuthCard.module.css';

export function LoginPage() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Bitte E-Mail und Passwort eingeben.');
      return;
    }

    setIsLoading(true);
    setError('');

    const loginError = await login(email.trim(), password);
    setIsLoading(false);

    if (loginError) {
      setError(loginError);
      return;
    }

    if (profile.onboardingCompleted) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        <Link to="/" className={styles.logo}>LiftED</Link>
        <h1 className={styles.title}>Willkommen zurück</h1>
        <p className={styles.subtitle}>Melde dich mit deiner E-Mail an.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* E-Mail */}
          <div className={styles.fieldGroup}>
            <label htmlFor="login-email" className={styles.label}>E-Mail-Adresse</label>
            <input
              id="login-email"
              type="email"
              className={[styles.input, error ? styles.inputError : ''].join(' ')}
              placeholder="max@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              autoComplete="email"
              autoFocus
            />
          </div>

          {/* Passwort */}
          <div className={styles.fieldGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <label htmlFor="login-pw" className={styles.label}>Passwort</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#64748B', textDecoration: 'none' }}>
                Vergessen?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="login-pw"
                type={showPw ? 'text' : 'password'}
                className={[styles.input, error ? styles.inputError : ''].join(' ')}
                placeholder="Dein Passwort"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
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
            {error && <p className={styles.errorMsg} role="alert">{error}</p>}
          </div>

          <Button type="submit" variant="primary" fullWidth loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Anmelden…' : 'Anmelden →'}
          </Button>

        </form>

        <p className={styles.hint}>
          Noch kein Account?{' '}
          <Link to="/register" className={styles.hintLink}>Jetzt registrieren</Link>
        </p>
        <Link to="/" className={styles.backLink}>← Zurück zur Startseite</Link>
      </div>
    </div>
  );
}
