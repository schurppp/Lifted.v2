/*
  LearningInfoPage – Modul 03: Learning (Konzept-Infoseite)
  ----------------------------------------------------------
  Abgekapselte Infoseite über das Konzept "Lernen zwischen Gym-Sets"
  und die wissenschaftliche Verbindung von Sport und kognitiver
  Leistungsfähigkeit. Kein Algorithmus, kein extra Anmelde-Schritt.
  Eigenständige Seite – Einstieg bleibt HomePage / Dashboard.
*/
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import styles from './ModuleInfoPage.module.css';
import infoStyles from './LearningInfoPage.module.css';

const SCIENCE_CARDS = [
  {
    icon: 'NP',
    title: 'Neuroplastizität nach Sport',
    desc: 'Aerobe Belastung erhöht den BDNF-Spiegel (Brain-Derived Neurotrophic Factor) – ein Protein, das Synapsenbildung fördert. Studien zeigen eine um bis zu 20 % verbesserte Gedächtnisleistung nach moderater Bewegung.',
    source: 'Ratey & Loehr, 2011',
  },
  {
    icon: 'PA',
    title: 'Pausenlernen steigert Retention',
    desc: 'Kurze Lerneinheiten in Trainingspausen (5–15 Min.) nutzen den erhöhten Blutfluss ins Präfrontale Cortex. Das Arbeitsgedächtnis ist in dieser Phase messbar aktiver als im Ruhezustand.',
    source: 'Winter et al., 2007',
  },
  {
    icon: 'KZ',
    title: 'Konzentration durch Dopamin',
    desc: 'Training setzt Dopamin und Noradrenalin frei – dieselben Neurotransmitter, die Konzentration und Motivation regulieren. Das Zeitfenster für fokussiertes Lernen öffnet sich direkt nach einem Set.',
    source: 'Tomporowski, 2003',
  },
  {
    icon: 'MO',
    title: 'Mikro-Lerneinheiten wirken',
    desc: 'Das Gehirn konsolidiert Informationen in kurzen Intervallen besser als in langen Sitzungen. 10 Minuten zwischen Sets ersetzen keine Vorlesungsstunde – aber sie ergänzen sie effektiv.',
    source: 'Cepeda et al., 2006',
  },
];

const HOW_IT_FITS = [
  { time: 'Vor dem Training', text: 'Lernziel setzen, Lektion kurz überfliegen — mentale Vorbereitung.' },
  { time: 'Zwischen den Sets', text: '2–4 Min. Pause = ideale Zeitfenster für eine Lektion oder Quiz-Frage.' },
  { time: 'Nach dem Training', text: 'Erhöhter BDNF-Spiegel hält 20–30 Min. an — perfekt für Wiederholung.' },
];

export function LearningInfoPage() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.moduleTag}>
            Modul 03 · Learning · Konzept
          </span>
          <h1 className={styles.heroTitle}>
            Lernen zwischen<br />
            <em className={styles.heroAccent}>den Gym-Sets.</em>
          </h1>
          <p className={styles.heroSub}>
            Sport und Lernen sind keine Gegensätze – sie verstärken sich gegenseitig.
            LiftED verbindet Trainingspausen mit Mikro-Lerneinheiten: wissenschaftlich
            begründet, praktisch umsetzbar.
          </p>
          <div className={styles.heroCtas}>
            <Button onClick={() => { window.location.href = '/register'; }}>
              Jetzt ausprobieren →
            </Button>
            <Link to="/so-funktionierts" className={styles.loginLink}>Methode ansehen</Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={infoStyles.timelineWrap}>
            {HOW_IT_FITS.map((h, i) => (
              <div key={i} className={infoStyles.timelineItem}>
                <div className={infoStyles.timelineDot} />
                {i < HOW_IT_FITS.length - 1 && <div className={infoStyles.timelineLine} />}
                <div className={infoStyles.timelineContent}>
                  <span className={infoStyles.timelineTime}>{h.time}</span>
                  <p className={infoStyles.timelineText}>{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM ES FUNKTIONIERT */}
      <section className={styles.flowSection}>
        <div className={styles.container}>
          <p className={styles.sectionEye}>Wissenschaft</p>
          <h2 className={styles.sectionTitle}>Warum Sport das Lernen verbessert</h2>
          <div className={styles.featuresGrid}>
            {SCIENCE_CARDS.map((c) => (
              <div key={c.icon} className={styles.featureCard}>
                <span className={styles.featureIcon}>{c.icon}</span>
                <h3 className={styles.featureTitle}>{c.title}</h3>
                <p className={styles.featureDesc}>{c.desc}</p>
                <span className={infoStyles.sourceTag}>{c.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAS KONZEPT IN DER APP */}
      <section className={styles.modulesSection}>
        <div className={styles.container}>
          <p className={styles.sectionEye}>In LiftED</p>
          <h2 className={styles.sectionTitle}>So ist es in der App umgesetzt</h2>
          <div className={infoStyles.conceptGrid}>
            <div className={infoStyles.conceptCard}>
              <div className={infoStyles.conceptIcon} style={{ background: 'rgba(249,115,22,0.15)', color: '#FB923C' }}>TR</div>
              <h3 className={infoStyles.conceptTitle}>Training wie gewohnt</h3>
              <p className={infoStyles.conceptDesc}>
                Dein Trainingsplan läuft normal. Sets, Reps, RPE-Tracking –
                nichts ändert sich an deiner Gym-Routine.
              </p>
            </div>
            <div className={infoStyles.conceptArrow}>→</div>
            <div className={infoStyles.conceptCard} style={{ borderColor: 'rgba(183,240,0,0.3)' }}>
              <div className={infoStyles.conceptIcon} style={{ background: 'rgba(183,240,0,0.12)', color: 'var(--color-lime)' }}>LE</div>
              <h3 className={infoStyles.conceptTitle}>Mikro-Lektionen in Pausen</h3>
              <p className={infoStyles.conceptDesc}>
                5–15 Minuten Lerninhalt pro Lektion – exakt auf Pausenlängen
                zugeschnitten. Mathematik, Programmierung, Rechnungslegung.
              </p>
            </div>
            <div className={infoStyles.conceptArrow}>→</div>
            <div className={infoStyles.conceptCard}>
              <div className={infoStyles.conceptIcon} style={{ background: 'rgba(45,212,191,0.15)', color: '#2DD4BF' }}>FT</div>
              <h3 className={infoStyles.conceptTitle}>Fortschritt sichtbar</h3>
              <p className={infoStyles.conceptDesc}>
                Quiz nach jeder Lektion, Fortschrittsbalken pro Modul –
                du siehst, was du gelernt hast und was als Nächstes kommt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Nächste Pause produktiv nutzen?</h2>
          <p className={styles.ctaSub}>
            Registriere dich, richte dein Training ein – und starte mit der ersten Lektion
            schon in deiner nächsten Trainingspause.
          </p>
          <Button size="lg" onClick={() => { window.location.href = '/register'; }}>
            Kostenlos starten →
          </Button>
        </div>
      </section>

    </div>
  );
}

