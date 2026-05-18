/*
  HomePage – Öffentliche Startseite
  ------------------------------------
  Ziel: In 10 Sekunden klar machen, was LiftED ist und was der nächste
  Schritt ist. Laut Marktanalyse verlassen 60% der Nutzer eine Seite ohne
  klares Value Proposition innerhalb von 10-20 Sekunden.
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Goal } from '../../types';
import { Button } from '../../components/ui/Button';
import styles from './HomePage.module.css';

const GOALS: { value: Goal; label: string; desc: string }[] = [
  { value: 'muscle',    label: 'Muskelaufbau',    desc: 'Mehr Masse und Stärke aufbauen' },
  { value: 'fat-loss',  label: 'Fettabbau',       desc: 'Körperfett reduzieren, Muskeln halten' },
  { value: 'recomp',    label: 'Body Recomp',     desc: 'Gleichzeitig Muskeln und Fett optimieren' },
  { value: 'health',    label: 'Gesünder leben', desc: 'Langfristige Gewohnheiten aufbauen' },
  { value: 'knowledge', label: 'Wissen aufbauen', desc: 'Hintergründe verstehen, besser entscheiden' },
];

const STATS = [
  { value: '3',    label: 'Trainingspläne', sub: 'FB, PPL, UL' },
  { value: '10+',  label: 'Rezepte',         sub: 'Meal-Prep optimiert' },
  { value: '9',    label: 'Lernlektionen',   sub: 'Mit Quiz & Fortschritt' },
  { value: '100%', label: 'Im Browser',      sub: 'Kein Download nötig' },
];

export function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const navigate = useNavigate();

  function handleStart() {
    if (selectedGoal) sessionStorage.setItem('lifted_preselect_goal', selectedGoal);
    navigate('/register');
  }

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Training · Ernährung · Lernen</span>
            <h1 className={styles.heroTitle}>LiftED –<br />Dein persönliches<br />Betriebssystem.</h1>
            <p className={styles.heroSub}>
              Die erste Plattform, die adaptives Training, gesunde Ernährung
              und lernpsychologisch fundiertes Wissen in einem System verbindet.
            </p>

            <div className={styles.goalSection}>
              <p className={styles.goalSectionLabel}>Was ist dein Ziel?</p>
              <div className={styles.goalGrid}>
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    className={[styles.goalChip, selectedGoal === g.value ? styles.goalChipActive : ''].join(' ')}
                    onClick={() => setSelectedGoal(g.value)}
                    aria-pressed={selectedGoal === g.value}
                  >
                    <span className={styles.goalChipTitle}>{g.label}</span>
                    <span className={styles.goalChipDesc}>{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.heroCtas}>
              <Button size="lg" onClick={handleStart}>
                {selectedGoal ? 'Plan kostenlos erstellen' : 'Loslegen'} &rarr;
              </Button>
              <Button size="lg" variant="ghost" onClick={() => navigate('/so-funktionierts')}>
                Wie funktioniert's?
              </Button>
            </div>
          </div>

          {/* Mini-Dashboard-Vorschau rechts */}
          <div className={styles.previewWrap} aria-hidden="true">
            <div className={styles.previewWindow}>
              <div className={styles.previewBar}>
                <span className={styles.dot} style={{background:'#FF5F57'}} />
                <span className={styles.dot} style={{background:'#FEBC2E'}} />
                <span className={styles.dot} style={{background:'#28C840'}} />
                <span className={styles.previewBarTitle}>Dashboard</span>
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewCards}>
                  <div className={styles.previewCard} style={{borderLeft:'3px solid #B7F000'}}>
                    <p className={styles.previewCardSub}>Heute</p>
                    <p className={styles.previewCardMain}>Push 55 Min</p>
                  </div>
                  <div className={styles.previewCard} style={{borderLeft:'3px solid #0F766E'}}>
                    <p className={styles.previewCardSub}>Ernährung</p>
                    <p className={styles.previewCardMain}>3 Rezepte</p>
                  </div>
                </div>
                <div className={styles.previewProgressBlock}>
                  <p className={styles.previewProgressLabel}>Wochenfortschritt 60%</p>
                  <div className={styles.previewProgressTrack}>
                    <div className={styles.previewProgressFill} style={{width:'60%'}} />
                  </div>
                </div>
                <div className={styles.previewLesson}>
                  <span>Lernen: React Basics - 7 Min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statSub}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DREI SAEULEN */}
      <section className="section">
        <div className="container">
          <span className="section-kicker">Alles an einem Ort</span>
          <h2 className="section-title">Drei Bereiche. Ein System.</h2>
          <p className="section-intro" style={{marginBottom:'2rem'}}>
            LiftED verbindet Training, Ernährung und Lernen als verzahntes System
            mit einem gemeinsamen Fortschrittsdashboard.
          </p>
          <div className={styles.pillarsGrid}>
            {[
              { color:'var(--color-lime)', icon:'Trainingspläne', title:'Training', desc:'Drei bewehrte Pläne (Full Body, PPL, Upper/Lower) mit adaptiver Wochenansicht und RPE-Tracking.', items:['Adaptive Wochenstruktur','Übungen mit Sets und Reps','Fortschritts-Log'] },
              { color:'var(--color-teal)', icon:'Ernährung', title:'Ernährung', desc:'Meal-Prep-optimierte Rezepte mit vollständigen Nährwerten, Filterung nach Ziel und interaktiver Einkaufsliste.', items:['Ziel-basierte Filter','Makronautriwerte pro Portion','Interaktive Einkaufsliste'] },
              { color:'var(--color-orange)', icon:'Lernen', title:'Lernen', desc:'Mikro-Lernmodule für Mathe, Programmierung und Rechnungslegung mit sofortigem Quiz-Feedback.', items:['3-7 Minuten pro Lektion','Quiz mit Sofort-Erklärung','Persistenter Lernfortschritt'] },
            ].map((p) => (
              <div key={p.title} className={styles.pillar} style={{ borderTop: `4px solid ${p.color}` }}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
                <ul className={styles.pillarList}>
                  {p.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.ctaSection}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 className={styles.ctaTitle}>Bereit? Dein Plan wartet.</h2>
          <p className={styles.ctaSub}>5 kurze Fragen. 1 persönlicher Plan. Direkt im Browser.</p>
          <Button size="lg" onClick={() => navigate('/register')}>
            Plan kostenlos erstellen &rarr;
          </Button>
        </div>
      </section>
    </div>
  );
}

