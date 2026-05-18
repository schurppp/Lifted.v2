/*
  MealsInfoPage – Modul 02: Meals (Standard-Infoseite)
  -----------------------------------------------------
  Öffentliche Seite im PublicLayout. Zeigt, was das Ernährungs-Modul
  kann, erklärt den Personen-Daten-Fluss (Anmeldung II) und führt
  Besucher zur Registrierung.
*/
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import styles from './ModuleInfoPage.module.css';

const FEATURES = [
  {
    icon: 'RE',
    title: 'Zielgerechte Rezepte',
    desc: 'Alle Rezepte sind nach Ziel gefiltert – Muskelaufbau, Fettabbau, Recomp. High-Protein und Low-Carb inklusive.',
  },
  {
    icon: 'MK',
    title: 'Makro-Übersicht',
    desc: 'Kalorien, Protein, Kohlenhydrate und Fett pro Portion – damit du weißt, was du isst.',
  },
  {
    icon: 'EL',
    title: 'Einkaufsliste',
    desc: 'Zutaten aus mehreren Rezepten direkt in eine Einkaufsliste übernehmen. Abhaken, fertig.',
  },
  {
    icon: 'KD',
    title: 'TDEE-Berechnung',
    desc: 'Der Algorithmus berechnet deinen Kalorienbedarf aus Körperdaten und Aktivitätslevel (Mifflin-St.-Jeor).',
  },
];

const FLOW_STEPS = [
  { num: '1', label: 'Personen-Daten eingeben', desc: 'Geschlecht, Alter, Größe, Gewicht und Aktivitätslevel im Onboarding angeben.' },
  { num: '2', label: 'Algorithmus berechnet TDEE', desc: 'Aus der Meals-Datenbank werden passende Rezepte gefiltert und Makros berechnet.' },
  { num: '3', label: 'Rezepte entdecken', desc: 'Rezepte nach Mahlzeit, Ziel und Präferenz durchstöbern, Zutaten in die Liste übernehmen.' },
];

const DIET_TAGS = ['High-Protein', 'Low-Carb', 'Vegetarisch', 'Vegan', 'Meal Prep', 'Quick', 'Günstig'];

export function MealsInfoPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.moduleTag} style={{ background: 'rgba(15,118,110,0.2)', color: '#2DD4BF' }}>Modul 02 · Meals</span>
          <h1 className={styles.heroTitle}>
            Ernährung, die zu<br />
            <em className={styles.heroAccent} style={{ color: '#2DD4BF' }}>deinen Zielen passt.</em>
          </h1>
          <p className={styles.heroSub}>
            Kein generischer Ernährungsplan. LiftED berechnet deinen Kalorienbedarf aus
            deinen Körperdaten und liefert passende Rezepte – abgestimmt auf dein Ziel
            und deine Ernährungspräferenz.
          </p>
          <div className={styles.heroCtas}>
            <Button
              style={{ background: 'var(--color-teal)' }}
              onClick={() => { window.location.href = '/register'; }}
            >
              Ernährungsplan starten →
            </Button>
            <Link to="/login" className={styles.loginLink}>Bereits registriert?</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.mealPreview}>
            <div className={styles.mealPreviewHeader}>
              <span style={{ color: '#2DD4BF', fontWeight: 700, fontSize: '11px' }}>Heutiger Makro-Bedarf</span>
            </div>
            <div className={styles.macroRow}>
              <div className={styles.macroItem}>
                <span className={styles.macroVal}>2 340</span>
                <span className={styles.macroKey}>kcal</span>
              </div>
              <div className={styles.macroItem}>
                <span className={styles.macroVal} style={{ color: '#2DD4BF' }}>175g</span>
                <span className={styles.macroKey}>Protein</span>
              </div>
              <div className={styles.macroItem}>
                <span className={styles.macroVal} style={{ color: 'var(--color-lime)' }}>260g</span>
                <span className={styles.macroKey}>Carbs</span>
              </div>
            </div>
            <div className={styles.mealPreviewLabel}>Passende Rezepte für dich</div>
            {['Hähnchen Teriyaki Bowl', 'Protein Overnight Oats', 'Linsen Dahl'].map((r) => (
              <div key={r} className={styles.mealItem}>{r}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WIE ES FUNKTIONIERT */}
      <section className={styles.flowSection}>
        <div className={styles.container}>
          <p className={styles.sectionEye}>Architektur · Modul 02</p>
          <h2 className={styles.sectionTitle}>Wie der Meals-Algorithmus funktioniert</h2>
          <div className={styles.flowSteps}>
            {FLOW_STEPS.map((s, i) => (
              <div key={i} className={styles.flowStep}>
                <span className={styles.flowNum} style={{ background: 'rgba(15,118,110,0.2)', color: '#2DD4BF' }}>{s.num}</span>
                <div>
                  <p className={styles.flowLabel}>{s.label}</p>
                  <p className={styles.flowDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.flowNote} style={{ borderColor: 'rgba(15,118,110,0.4)', background: 'rgba(15,118,110,0.08)' }}>
            <span className={styles.flowNoteBadge} style={{ background: 'rgba(15,118,110,0.25)', color: '#2DD4BF' }}>Algorithmus</span>
            Meals-Datenbank → Personen-Daten + Anmeldung II → Angemeldet-View
          </div>
        </div>
      </section>

      {/* ERNÄHRUNGSPRÄFERENZEN */}
      <section className={styles.tagsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Alle Ernährungsstile abgedeckt</h2>
          <div className={styles.tagCloud}>
            {DIET_TAGS.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Was du bekommst</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.icon} className={[styles.featureCard, styles.featureCardTeal].join(' ')}>
                <span className={styles.featureIcon} style={{ background: 'rgba(15,118,110,0.2)', color: '#2DD4BF' }}>{f.icon}</span>
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
          <h2 className={styles.ctaTitle}>Ernährung endlich im Griff?</h2>
          <p className={styles.ctaSub}>Körperdaten eingeben, TDEE erhalten, passende Rezepte entdecken.</p>
          <Button
            size="lg"
            style={{ background: 'var(--color-teal)' }}
            onClick={() => { window.location.href = '/register'; }}
          >
            Jetzt Ernährungsplan starten →
          </Button>
        </div>
      </section>

    </div>
  );
}

