/*
  HowItWorksPage – Methodik-Seite
  ---------------------------------
  Erklärt den 5-Schritt-Onboarding-Prozess und die Systematik dahinter.
  Warum: Vertrauen aufbauen bevor der Nutzer seine Daten eingibt.
*/
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import styles from './HowItWorksPage.module.css';

const STEPS = [
  { n:1, icon:'🎯', title:'Ziel wählen', desc:'Du sagst uns, was du erreichen möchtest: Muskelaufbau, Fettabbau, Gesundheit oder Wissen. Das Ziel bestimmt deinen gesamten Plan.' },
  { n:2, icon:'📊', title:'Level angeben', desc:'Einsteiger, Fortgeschrittener oder Profi? Dein Level bestimmt Volumen, Intensität und Komplexität deines Plans.' },
  { n:3, icon:'⏱',  title:'Zeit & Equipment', desc:'Wie viele Tage pro Woche kannst du trainieren? Hast du Zugang zu einem Gym oder trainierst du zuhause?' },
  { n:4, icon:'🥗', title:'Ernährungs-Präferenzen', desc:'Vegetarisch, vegan, Low-Carb oder Standard? Deine Rezepte und Wochen-Ernährungspläne werden darauf abgestimmt.' },
  { n:5, icon:'📚', title:'Lernfokus wählen', desc:'Welche Themen interessieren dich? Die Lernmodule werden entsprechend priorisiert und als Mikro-Lektionen eingebettet.' },
];

export function HowItWorksPage() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="section">
        <div className="container">
          <span className="section-kicker">So funktioniert LiftED</span>
          <h1 className="section-title" style={{ maxWidth: 600 }}>
            5 Fragen. 1 persönlicher Plan. Sofort einsatzbereit.
          </h1>
          <p className="section-intro mb-8">
            Kein langes Durchklicken, keine versteckten Einstellungen. LiftED generiert
            deinen Plan aus fünf gezielten Fragen – und du kannst ihn jederzeit anpassen.
          </p>

          {/* Schritt-Visualisierung */}
          <div className={styles.steps}>
            {STEPS.map((step) => (
              <div key={step.n} className={styles.step}>
                <div className={styles.stepNumber}>{step.n}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.icon} {step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button size="lg" onClick={() => navigate('/register')}>
              Jetzt starten &rarr;
            </Button>
            <Button size="lg" variant="ghost" onClick={() => navigate('/')}>
              Zurück zur Startseite
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

