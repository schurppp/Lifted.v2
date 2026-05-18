/*
  ForgotPasswordPage – Passwort zurücksetzen
  -------------------------------------------
  Da kein Backend existiert, läuft der Reset direkt im Browser:
  Schritt 1: E-Mail eingeben → Account-Lookup in localStorage
  Schritt 2: Neues Passwort setzen (kein E-Mail-Token nötig)

  In einer echten App würde Schritt 1 eine E-Mail mit Token auslösen
  und Schritt 2 erst nach Token-Verifikation erfolgen.
*/
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetAccountPassword } from '../storage/accountStorage';
import { Button } from '../components/ui/Button';
import styles from './AuthCard.module.css';

type Step = 'email' | 'newpw' | 'done';

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [step,    setStep]    = useState<Step>('email');
  const [email,   setEmail]   = useState('');
  const [newPw,   setNewPw]   = useState('');
  const [confPw,  setConfPw]  = useState('');
  const [showPw,  setShowPw]  = useState(false);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // ── Schritt 1: E-Mail prüfen ──────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError('Bitte E-Mail eingeben.'); return; }
    setLoading(true);
    setError('');
    // Simulierte Netzwerklatenz
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // Wir prüfen nicht öffentlich, ob die E-Mail existiert (Security best practice).
    // Die eigentliche Prüfung passiert erst beim Reset-Versuch in Schritt 2.
    setStep('newpw');
  }

  // ── Schritt 2: Neues Passwort setzen ─────────────────────────────────────
  async function handlePwSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPw.length < 8) { setError('Passwort muss mindestens 8 Zeichen haben.'); return; }
    if (newPw !== confPw)  { setError('Die Passwörter stimmen nicht überein.'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 600));
    const result = resetAccountPassword(email.trim(), newPw);
    setLoading(false);
    if (!result.ok) { setError(result.error); return; }
    setStep('done');
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        <Link to="/" className={styles.logo}>LiftED</Link>

        {/* ── Step 1: E-Mail ── */}
        {step === 'email' && (
          <>
            <h1 className={styles.title}>Passwort vergessen</h1>
            <p className={styles.subtitle}>
              Gib deine E-Mail-Adresse ein. Wenn ein Account existiert,
              kannst du direkt ein neues Passwort vergeben.
            </p>
            <form className={styles.form} onSubmit={handleEmailSubmit} noValidate>
              <div className={styles.fieldGroup}>
                <label htmlFor="fp-email" className={styles.label}>E-Mail-Adresse</label>
                <input
                  id="fp-email"
                  type="email"
                  className={[styles.input, error ? styles.inputError : ''].join(' ')}
                  placeholder="max@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  autoComplete="email"
                  autoFocus
                />
                {error && <p className={styles.errorMsg} role="alert">{error}</p>}
              </div>
              <Button type="submit" variant="primary" fullWidth loading={loading} disabled={loading}>
                {loading ? 'Prüfen…' : 'Weiter →'}
              </Button>
            </form>
          </>
        )}

        {/* ── Step 2: Neues Passwort ── */}
        {step === 'newpw' && (
          <>
            <h1 className={styles.title}>Neues Passwort</h1>
            <p className={styles.subtitle}>
              Vergib ein neues Passwort für <strong style={{ color: '#e2e8f0' }}>{email}</strong>.
            </p>
            <form className={styles.form} onSubmit={handlePwSubmit} noValidate>
              <div className={styles.fieldGroup}>
                <label htmlFor="fp-newpw" className={styles.label}>Neues Passwort</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="fp-newpw"
                    type={showPw ? 'text' : 'password'}
                    className={[styles.input, error ? styles.inputError : ''].join(' ')}
                    placeholder="Min. 8 Zeichen"
                    value={newPw}
                    onChange={(e) => { setNewPw(e.target.value); setError(''); }}
                    autoComplete="new-password"
                    autoFocus
                    style={{ paddingRight: '3rem' }}
                  />
                  <button type="button"
                    onClick={() => setShowPw((v) => !v)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    {showPw ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="fp-confpw" className={styles.label}>Passwort bestätigen</label>
                <input
                  id="fp-confpw"
                  type="password"
                  className={[styles.input, (error || (confPw && confPw !== newPw)) ? styles.inputError : ''].join(' ')}
                  placeholder="Wiederholen"
                  value={confPw}
                  onChange={(e) => { setConfPw(e.target.value); setError(''); }}
                  autoComplete="new-password"
                />
                {error && <p className={styles.errorMsg} role="alert">{error}</p>}
              </div>
              <Button type="submit" variant="primary" fullWidth loading={loading} disabled={loading}>
                {loading ? 'Speichern…' : 'Passwort setzen →'}
              </Button>
            </form>
            <button
              onClick={() => { setStep('email'); setError(''); }}
              className={styles.backLink}
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 'var(--space-4)' }}>
              ← Andere E-Mail eingeben
            </button>
          </>
        )}

        {/* ── Step 3: Bestätigung ── */}
        {step === 'done' && (
          <>
            <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>✓</div>
            <h1 className={styles.title}>Passwort gesetzt!</h1>
            <p className={styles.subtitle}>
              Dein Passwort wurde erfolgreich geändert.
              Du kannst dich jetzt mit dem neuen Passwort anmelden.
            </p>
            <Button variant="primary" fullWidth onClick={() => navigate('/login')}
              style={{ marginTop: 'var(--space-4)' }}>
              Jetzt anmelden →
            </Button>
          </>
        )}

        {step !== 'done' && (
          <Link to="/login" className={styles.backLink}>← Zurück zum Login</Link>
        )}
      </div>
    </div>
  );
}
