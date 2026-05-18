/*
  OnboardingPage – 2-Phasen-Wizard nach der Registrierung
  ---------------------------------------------------------
  Phase 1 (Schritte 0-3): Trainingsdaten — Ziel, Level, Equipment,
  Trainingstage + Ernährungspräferenz + Lernfokus.
  Phase 2 (Schritte 4-5 → eigentlich 4): Personenbezogene Daten —
  Größe, Gewicht, Alter, Geschlecht, Aktivitätslevel.

  Der Nutzer ist zu diesem Zeitpunkt bereits eingeloggt (kommt von
  RegisterPage). login() wird hier NICHT mehr aufgerufen.
*/
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Goal, FitnessLevel, Equipment, DietPreference, Gender, ActivityLevel } from '../types';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import styles from './OnboardingPage.module.css';

// ─── Daten-Definitionen ────────────────────────────────────────────────────

const GOALS: { value: Goal; label: string; desc: string; icon: string }[] = [
  { value: 'muscle',    icon: 'M', label: 'Muskelaufbau',   desc: 'Muskelmasse und Kraft aufbauen' },
  { value: 'fat-loss',  icon: 'F', label: 'Fettabbau',      desc: 'Körperfett reduzieren, Muskeln erhalten' },
  { value: 'recomp',    icon: 'R', label: 'Body Recomp',    desc: 'Körperzusammensetzung verbessern' },
  { value: 'health',    icon: 'G', label: 'Gesundheit',     desc: 'Langfristig gesund und fit bleiben' },
  { value: 'knowledge', icon: 'W', label: 'Wissen',         desc: 'Hintergründe verstehen' },
];

const LEVELS: { value: FitnessLevel; label: string; desc: string }[] = [
  { value: 'beginner',     label: 'Einsteiger',        desc: 'Unter 6 Monate Training oder Neustart' },
  { value: 'intermediate', label: 'Fortgeschrittener', desc: '6 Monate bis 3 Jahre konsequentes Training' },
  { value: 'advanced',     label: 'Profi',             desc: 'Über 3 Jahre strukturiertes Training' },
];

const EQUIPMENT: { value: Equipment; label: string; desc: string }[] = [
  { value: 'gym',     label: 'Fitnessstudio',  desc: 'Vollausgestattetes Gym mit Maschinen' },
  { value: 'home',    label: 'Zuhause',        desc: 'Kleine Heimausstattung, Kurzhanteln' },
  { value: 'minimal', label: 'Körpergewicht',  desc: 'Nur Körpergewicht, keine Geräte' },
];

const DAYS_OPTIONS = [2, 3, 4, 5, 6];

const DIET: { value: DietPreference; label: string }[] = [
  { value: 'standard',    label: 'Standard (alles)' },
  { value: 'highprotein', label: 'High-Protein' },
  { value: 'vegetarian',  label: 'Vegetarisch' },
  { value: 'vegan',       label: 'Vegan' },
  { value: 'lowcarb',     label: 'Low-Carb' },
];

const LEARNING_TOPICS = [
  { id: 'mathematik',      label: 'Mathematik' },
  { id: 'programmierung',  label: 'Programmierung' },
  { id: 'rechnungslegung', label: 'Rechnungslegung' },
];

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: 'male',    icon: 'M', label: 'Männlich' },
  { value: 'female',  icon: 'W', label: 'Weiblich'  },
  { value: 'diverse', icon: 'D', label: 'Divers'    },
];

const ACTIVITY_LEVELS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary',   label: 'Sitzend',         desc: 'Bürojob, kaum Bewegung' },
  { value: 'light',       label: 'Leicht aktiv',    desc: '1–3x Sport pro Woche' },
  { value: 'moderate',    label: 'Moderat aktiv',   desc: '3–5x Sport pro Woche' },
  { value: 'active',      label: 'Sehr aktiv',      desc: '6–7x intensives Training' },
  { value: 'very_active', label: 'Extrem aktiv',    desc: 'Körperlicher Job + tägliches Training' },
];

// ─── Phasen-Definitionen (für Fortschrittsanzeige) ─────────────────────────

const PHASES = [
  { label: 'Training', steps: [0, 1, 2, 3] },   // Ziel, Level/Equipment, Tage, Ernährung + Lernen
  { label: 'Persönliches', steps: [4] },          // Körperdaten
];

const PHASE_TITLES: Record<number, string> = {
  0: 'Phase 1 · Trainingsziele',
  1: 'Phase 1 · Trainingsziele',
  2: 'Phase 1 · Trainingsziele',
  3: 'Phase 1 · Trainingsziele',
  4: 'Phase 2 · Persönliche Daten',
};

const TOTAL_STEPS = 5; // 0–4

// ─── Wizard-Daten ──────────────────────────────────────────────────────────

interface WizardData {
  goal: Goal;
  level: FitnessLevel;
  daysPerWeek: number;
  equipment: Equipment;
  dietPreference: DietPreference;
  learningFocus: string[];
  gender: Gender;
  age: string;
  heightCm: string;
  weightKg: string;
  activityLevel: ActivityLevel;
}

// ─── Komponente ────────────────────────────────────────────────────────────

export function OnboardingPage() {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const { isLoggedIn, userName } = useAuth();

  // Nicht eingeloggte Nutzer → zur Registrierung
  useEffect(() => {
    if (!isLoggedIn) navigate('/register', { replace: true });
  }, [isLoggedIn, navigate]);

  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(() => {
    const preGoal = sessionStorage.getItem('lifted_preselect_goal') as Goal | null;
    if (preGoal) sessionStorage.removeItem('lifted_preselect_goal');
    return {
      goal: preGoal ?? 'health',
      level: 'beginner',
      daysPerWeek: 3,
      equipment: 'gym',
      dietPreference: 'standard',
      learningFocus: [],
      gender: 'male',
      age: '',
      heightCm: '',
      weightKg: '',
      activityLevel: 'moderate',
    };
  });

  function next() { setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function handleFinish() {
    updateProfile({
      name: userName || 'Nutzer',
      goal: data.goal,
      level: data.level,
      daysPerWeek: data.daysPerWeek,
      equipment: data.equipment,
      dietPreference: data.dietPreference,
      learningFocus: data.learningFocus,
      onboardingCompleted: true,
      gender: data.gender,
      age: data.age       ? parseInt(data.age, 10)       : undefined,
      heightCm: data.heightCm ? parseInt(data.heightCm, 10) : undefined,
      weightKg: data.weightKg ? parseFloat(data.weightKg)   : undefined,
      activityLevel: data.activityLevel,
    });
    navigate('/dashboard');
  }

  const progress = Math.round((step / (TOTAL_STEPS - 1)) * 100);
  const currentPhase = step <= 3 ? 0 : 1;

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* ── Fortschritt ───────────────────────────────────────── */}
        <div className={styles.progressWrap}>
          {/* Phasen-Indikator */}
          <div className={styles.phaseRow}>
            {PHASES.map((p, i) => (
              <span
                key={i}
                className={[styles.phaseChip, i === currentPhase ? styles.phaseChipActive : ''].join(' ')}
              >
                {i + 1} · {p.label}
              </span>
            ))}
          </div>
          <ProgressBar value={progress} color="var(--color-orange)" height={4} />
          <p className={styles.progressLabel}>
            {PHASE_TITLES[step]} · Schritt {step + 1} von {TOTAL_STEPS}
          </p>
        </div>

        {/* ── Schritte ──────────────────────────────────────────── */}
        <div className={styles.stepContent}>

          {/* SCHRITT 0 – Trainingsziel */}
          {step === 0 && (
            <StepWrap title="Was ist dein primäres Ziel?" desc="Dein Ziel bestimmt Trainingsplan, Ernährung und Lernmodule.">
              <div className={styles.optionGrid}>
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    className={[styles.option, data.goal === g.value ? styles.optionActive : ''].join(' ')}
                    onClick={() => setData((d) => ({ ...d, goal: g.value }))}
                  >
                    <span className={styles.optionBadge}>{g.icon}</span>
                    <span className={styles.optionTitle}>{g.label}</span>
                    <span className={styles.optionDesc}>{g.desc}</span>
                  </button>
                ))}
              </div>
            </StepWrap>
          )}

          {/* SCHRITT 1 – Level + Equipment */}
          {step === 1 && (
            <StepWrap title="Level & Equipment" desc="Ehrlich antworten — falsche Angaben führen zu einem unpassenden Plan.">
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Dein aktueller Stand</p>
                <div className={styles.optionList}>
                  {LEVELS.map((l) => (
                    <button
                      key={l.value}
                      className={[styles.optionRow, data.level === l.value ? styles.optionRowActive : ''].join(' ')}
                      onClick={() => setData((d) => ({ ...d, level: l.value }))}
                    >
                      <div>
                        <p className={styles.optionRowTitle}>{l.label}</p>
                        <p className={styles.optionRowDesc}>{l.desc}</p>
                      </div>
                      {data.level === l.value && <span className={styles.checkmark}>OK</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Verfügbares Equipment</p>
                <div className={styles.optionList}>
                  {EQUIPMENT.map((eq) => (
                    <button
                      key={eq.value}
                      className={[styles.optionRow, data.equipment === eq.value ? styles.optionRowActive : ''].join(' ')}
                      onClick={() => setData((d) => ({ ...d, equipment: eq.value }))}
                    >
                      <div>
                        <p className={styles.optionRowTitle}>{eq.label}</p>
                        <p className={styles.optionRowDesc}>{eq.desc}</p>
                      </div>
                      {data.equipment === eq.value && <span className={styles.checkmark}>OK</span>}
                    </button>
                  ))}
                </div>
              </div>
            </StepWrap>
          )}

          {/* SCHRITT 2 – Trainingstage */}
          {step === 2 && (
            <StepWrap title="Wie oft trainierst du?" desc="Wähle realistisch — Konsistenz schlägt Volumen.">
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Trainingstage pro Woche</p>
                <div className={styles.dayPills}>
                  {DAYS_OPTIONS.map((d) => (
                    <button
                      key={d}
                      className={[styles.dayPill, data.daysPerWeek === d ? styles.dayPillActive : ''].join(' ')}
                      onClick={() => setData((prev) => ({ ...prev, daysPerWeek: d }))}
                    >
                      {d}×
                    </button>
                  ))}
                </div>
              </div>
            </StepWrap>
          )}

          {/* SCHRITT 3 – Ernährung + Lernfokus */}
          {step === 3 && (
            <StepWrap title="Ernährung & Lernen" desc="Rezepte und Lernmodule werden entsprechend angepasst.">
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Ernährungspräferenz</p>
                <div className={styles.optionGrid}>
                  {DIET.map((d) => (
                    <button
                      key={d.value}
                      className={[styles.option, data.dietPreference === d.value ? styles.optionActive : ''].join(' ')}
                      onClick={() => setData((prev) => ({ ...prev, dietPreference: d.value }))}
                    >
                      <span className={styles.optionTitle}>{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Lernthemen (Mehrfachauswahl)</p>
                <div className={styles.optionList}>
                  {LEARNING_TOPICS.map((t) => {
                    const isSelected = data.learningFocus.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        className={[styles.optionRow, isSelected ? styles.optionRowActive : ''].join(' ')}
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            learningFocus: isSelected
                              ? d.learningFocus.filter((id) => id !== t.id)
                              : [...d.learningFocus, t.id],
                          }))
                        }
                      >
                        <p className={styles.optionRowTitle}>{t.label}</p>
                        {isSelected && <span className={styles.checkmark}>OK</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </StepWrap>
          )}

          {/* SCHRITT 4 – Persönliche Daten (Phase 2) */}
          {step === 4 && (
            <StepWrap
              title="Deine Körperdaten"
              desc="Für die Ernährungsempfehlung — damit der Algorithmus deinen Kalorienbedarf (TDEE) berechnen kann. Kannst du auch überspringen."
            >
              <div className={styles.subSection}>
                <p className={styles.subLabel}>Geschlecht</p>
                <div className={styles.optionGrid}>
                  {GENDER_OPTIONS.map((g) => (
                    <button
                      key={g.value}
                      className={[styles.option, data.gender === g.value ? styles.optionActive : ''].join(' ')}
                      onClick={() => setData((d) => ({ ...d, gender: g.value }))}
                    >
                      <span className={styles.optionBadge}>{g.icon}</span>
                      <span className={styles.optionTitle}>{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.subSection}>
                <p className={styles.subLabel}>Alter, Größe &amp; Gewicht</p>
                <div className={styles.bodyInputRow}>
                  <label className={styles.bodyInputWrap}>
                    <span className={styles.bodyInputLabel}>Alter</span>
                    <input type="number" className={styles.bodyInput} placeholder="25" min={10} max={100}
                      value={data.age} onChange={(e) => setData((d) => ({ ...d, age: e.target.value }))} />
                    <span className={styles.bodyInputUnit}>Jahre</span>
                  </label>
                  <label className={styles.bodyInputWrap}>
                    <span className={styles.bodyInputLabel}>Größe</span>
                    <input type="number" className={styles.bodyInput} placeholder="175" min={100} max={230}
                      value={data.heightCm} onChange={(e) => setData((d) => ({ ...d, heightCm: e.target.value }))} />
                    <span className={styles.bodyInputUnit}>cm</span>
                  </label>
                  <label className={styles.bodyInputWrap}>
                    <span className={styles.bodyInputLabel}>Gewicht</span>
                    <input type="number" className={styles.bodyInput} placeholder="70" min={30} max={300} step={0.5}
                      value={data.weightKg} onChange={(e) => setData((d) => ({ ...d, weightKg: e.target.value }))} />
                    <span className={styles.bodyInputUnit}>kg</span>
                  </label>
                </div>
              </div>

              <div className={styles.subSection}>
                <p className={styles.subLabel}>Aktivitätslevel im Alltag</p>
                <div className={styles.optionList}>
                  {ACTIVITY_LEVELS.map((a) => (
                    <button
                      key={a.value}
                      className={[styles.optionRow, data.activityLevel === a.value ? styles.optionRowActive : ''].join(' ')}
                      onClick={() => setData((d) => ({ ...d, activityLevel: a.value }))}
                    >
                      <div>
                        <p className={styles.optionRowTitle}>{a.label}</p>
                        <p className={styles.optionRowDesc}>{a.desc}</p>
                      </div>
                      {data.activityLevel === a.value && <span className={styles.checkmark}>OK</span>}
                    </button>
                  ))}
                </div>
              </div>
            </StepWrap>
          )}
        </div>

        {/* ── Navigation ───────────────────────────────────────── */}
        <div className={styles.nav}>
          {step > 0 && <Button variant="ghost" onClick={back}>Zurück</Button>}
          <div style={{ flex: 1 }} />
          {step < TOTAL_STEPS - 1 ? (
            <Button onClick={next}>Weiter →</Button>
          ) : (
            <Button onClick={handleFinish}>Plan erstellen →</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepWrap({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className={styles.stepTitle}>{title}</h2>
      <p className={styles.stepDesc}>{desc}</p>
      <div className={styles.stepBody}>{children}</div>
    </div>
  );
}
