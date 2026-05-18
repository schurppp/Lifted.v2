/*
  TrainingInfoPage – Modul 01: Training (Standard-Infoseite)
  -----------------------------------------------------------
  Öffentliche Seite im PublicLayout. Zeigt, was das Training-Modul
  kann, wie der Algorithmus funktioniert (Ziel-Daten + Anmeldung I)
  und führt Besucher zur Registrierung.
*/
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import styles from './ModuleInfoPage.module.css';

const FEATURES = [
  {
    icon: 'PL',
    title: 'Personalisierte Pläne',
    desc: 'Der Algorithmus wählt aus Full Body, Push Pull Legs und Upper Lower – basierend auf deinen Ziel-Daten.',
  },
  {
    icon: 'RP',
    title: 'RPE-Tracking',
    desc: 'Nach jedem Training bewertest du deine subjektive Belastung (1–5). Der Algorithmus passt die Intensität an.',
  },
  {
    icon: 'PO',
    title: 'Progressive Overload',
    desc: 'Strukturierter Wochenaufbau mit klaren Schwerpunkten – Push, Pull, Legs, Full Body oder Upper/Lower.',
  },
  {
    icon: 'VL',
    title: 'Alle Levels',
    desc: 'Einsteiger, Fortgeschrittene und Profis bekommen verschiedene Pläne mit abgestimmten Volumen und Intensitäten.',
  },
];

const FLOW_STEPS = [
  { num: '1', label: 'Ziel-Daten eingeben', desc: 'Ziel, Level, Equipment und Trainingstage im Onboarding auswählen.' },
  { num: '2', label: 'Algorithmus erstellt Plan', desc: 'Aus der Trainingsdatenbank wird der passende Plan ausgewählt und konfiguriert.' },
  { num: '3', label: 'Training loggen', desc: 'Jede Session abhaken, RPE bewerten – Fortschritt wird automatisch gespeichert.' },
];

export function TrainingInfoPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.moduleTag}>Modul 01 · Training</span>
          <h1 className={styles.heroTitle}>
            Intelligentes Training,<br />
            <em className={styles.heroAccent}>das sich anpasst.</em>
          </h1>
          <p className={styles.heroSub}>
            Kein generischer Trainingsplan. LiftED wählt aus einer wissenschaftlich
            aufgebauten Datenbank den Plan, der exakt zu deinen Zielen, deinem Level
            und deiner verfügbaren Zeit passt.
          </p>
          <div className={styles.heroCtas}>
            <Button onClick={() => { window.location.href = '/register'; }}>
              Training starten →
            </Button>
            <Link to="/login" className={styles.loginLink}>Bereits registriert?</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.planPreview}>
            <div className={styles.planHeader}>
              <span className={styles.planTag}>Dein Plan</span>
              <span className={styles.planName}>Push · Pull · Legs</span>
            </div>
            {[
              { day: 'Mo', label: 'Push', done: true },
              { day: 'Mi', label: 'Pull', done: true },
              { day: 'Fr', label: 'Legs', done: false },
              { day: 'So', label: 'Ruhetag', done: false, rest: true },
            ].map((d) => (
              <div key={d.day} className={[styles.planDay, d.rest ? styles.planDayRest : ''].join(' ')}>
                <span className={styles.planDayLabel}>{d.day}</span>
                <span className={styles.planDayName}>{d.label}</span>
                {d.done && <span className={styles.planDayDone}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WIE ES FUNKTIONIERT */}
      <section className={styles.flowSection}>
        <div className={styles.container}>
          <p className={styles.sectionEye}>Architektur · Modul 01</p>
          <h2 className={styles.sectionTitle}>Wie der Training-Algorithmus funktioniert</h2>
          <div className={styles.flowSteps}>
            {FLOW_STEPS.map((s, i) => (
              <div key={i} className={styles.flowStep}>
                <span className={styles.flowNum}>{s.num}</span>
                <div>
                  <p className={styles.flowLabel}>{s.label}</p>
                  <p className={styles.flowDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.flowNote}>
            <span className={styles.flowNoteBadge}>Algorithmus</span>
            Trainingsdatenbank → Ziel-Daten + Anmeldung I → Angemeldet-View
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Was du bekommst</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.icon} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Bereit für strukturiertes Training?</h2>
          <p className={styles.ctaSub}>Kostenlos starten, Ziele eingeben, Plan erhalten.</p>
          <Button size="lg" onClick={() => { window.location.href = '/register'; }}>
            Jetzt Training starten →
          </Button>
        </div>
      </section>

    </div>
  );
}

