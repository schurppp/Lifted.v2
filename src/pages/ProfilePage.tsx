/*
  ProfilePage – Profil & Einstellungen bearbeiten
  -------------------------------------------------
  Vier bearbeitbare Bereiche:
    1. Name (inline Edit)
    2. Körperdaten (Geschlecht, Alter, Größe, Gewicht, Aktivität)
    3. Trainings-Präferenzen (Ziel, Level, Tage, Equipment, Diät)
    4. Passwort ändern (aktuelles + neues PW)
  + Abmelden-Zone
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import type { Goal, FitnessLevel, DietPreference, Equipment, Gender, ActivityLevel } from '../types';
import styles from './ProfilePage.module.css';

// ─── Konstanten ───────────────────────────────────────────────────────────────

const GOAL_OPTIONS: { value: Goal; label: string; marker: string }[] = [
  { value: 'muscle',    label: 'Muskeln aufbauen', marker: 'M' },
  { value: 'fat-loss',  label: 'Fettabbau',        marker: 'F' },
  { value: 'recomp',    label: 'Body Recomp',      marker: 'R' },
  { value: 'health',    label: 'Gesundheit',       marker: 'G' },
  { value: 'knowledge', label: 'Wissen aufbauen',  marker: 'W' },
];

const LEVEL_OPTIONS: { value: FitnessLevel; label: string; desc: string }[] = [
  { value: 'beginner',     label: 'Einsteiger',    desc: 'Unter 6 Monate Erfahrung' },
  { value: 'intermediate', label: 'Fortgeschritten', desc: '6 Monate – 3 Jahre' },
  { value: 'advanced',     label: 'Profi',         desc: 'Mehr als 3 Jahre' },
];

const DIET_OPTIONS: { value: DietPreference; label: string }[] = [
  { value: 'standard',    label: 'Standard' },
  { value: 'highprotein', label: 'High-Protein' },
  { value: 'vegetarian',  label: 'Vegetarisch' },
  { value: 'vegan',       label: 'Vegan' },
  { value: 'lowcarb',     label: 'Low-Carb' },
];

const EQUIPMENT_OPTIONS: { value: Equipment; label: string }[] = [
  { value: 'gym',     label: 'Fitnessstudio' },
  { value: 'home',    label: 'Zuhause' },
  { value: 'minimal', label: 'Körpergewicht' },
];

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male',    label: 'Männlich' },
  { value: 'female',  label: 'Weiblich' },
  { value: 'diverse', label: 'Divers' },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary',   label: 'Kaum aktiv',      desc: 'Bürojob, wenig Bewegung' },
  { value: 'light',       label: 'Leicht aktiv',    desc: '1–3× Sport/Woche' },
  { value: 'moderate',    label: 'Mäßig aktiv',     desc: '3–5× Sport/Woche' },
  { value: 'active',      label: 'Sehr aktiv',      desc: '6–7× intensiv' },
  { value: 'very_active', label: 'Extrem aktiv',    desc: 'Körperliche Arbeit + Sport' },
];

// ─── Kleine Hilfs-Hooks ───────────────────────────────────────────────────────

function useSaveState() {
  const [state, setState] = useState<'idle' | 'saved' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  function showSaved(text = 'Gespeichert!') {
    setState('saved'); setMsg(text);
    setTimeout(() => setState('idle'), 2000);
  }
  function showError(text: string) {
    setState('error'); setMsg(text);
    setTimeout(() => setState('idle'), 3000);
  }
  return { state, msg, showSaved, showError };
}

// ─── Komponente ───────────────────────────────────────────────────────────────

export function ProfilePage() {
  const { profile, updateProfile } = useUser();
  const { userName, userEmail, updateUserName, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  // ── 1. Name ──
  const [nameEdit, setNameEdit] = useState(false);
  const [nameVal, setNameVal]   = useState(userName || profile.name || '');
  const nameSave = useSaveState();

  function handleNameSave() {
    const err = updateUserName(nameVal);
    if (err) { nameSave.showError(err); return; }
    nameSave.showSaved();
    setNameEdit(false);
  }

  // ── 2. Körperdaten ──
  const [gender,   setGender]   = useState<Gender | ''>(profile.gender ?? '');
  const [age,      setAge]      = useState(profile.age?.toString() ?? '');
  const [height,   setHeight]   = useState(profile.heightCm?.toString() ?? '');
  const [weight,   setWeight]   = useState(profile.weightKg?.toString() ?? '');
  const [activity, setActivity] = useState<ActivityLevel | ''>(profile.activityLevel ?? '');
  const bodySave = useSaveState();

  function handleBodySave() {
    updateProfile({
      gender:        gender   || undefined,
      age:           age      ? parseInt(age, 10)       : undefined,
      heightCm:      height   ? parseFloat(height)      : undefined,
      weightKg:      weight   ? parseFloat(weight)      : undefined,
      activityLevel: activity || undefined,
    });
    bodySave.showSaved();
  }

  const bodyChanged =
    gender   !== (profile.gender ?? '') ||
    age      !== (profile.age?.toString() ?? '') ||
    height   !== (profile.heightCm?.toString() ?? '') ||
    weight   !== (profile.weightKg?.toString() ?? '') ||
    activity !== (profile.activityLevel ?? '');

  // ── 3. Trainings-Präferenzen ──
  const [goal,         setGoal]         = useState<Goal>(profile.goal);
  const [level,        setLevel]        = useState<FitnessLevel>(profile.level);
  const [diet,         setDiet]         = useState<DietPreference>(profile.dietPreference);
  const [equipment,    setEquipment]    = useState<Equipment>(profile.equipment);
  const [trainingDays, setTrainingDays] = useState<number>(profile.daysPerWeek);
  const prefSave = useSaveState();

  function handlePrefSave() {
    updateProfile({ goal, level, dietPreference: diet, equipment, daysPerWeek: trainingDays });
    prefSave.showSaved();
  }

  const prefChanged =
    goal !== profile.goal || level !== profile.level ||
    diet !== profile.dietPreference || trainingDays !== profile.daysPerWeek ||
    equipment !== profile.equipment;

  // ── 4. Passwort ──
  const [curPw,  setCurPw]  = useState('');
  const [newPw,  setNewPw]  = useState('');
  const [confPw, setConfPw] = useState('');
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const pwSave = useSaveState();

  function handlePwSave() {
    if (!curPw)  { pwSave.showError('Bitte aktuelles Passwort eingeben.'); return; }
    if (newPw.length < 8) { pwSave.showError('Neues Passwort muss mindestens 8 Zeichen haben.'); return; }
    if (newPw !== confPw) { pwSave.showError('Die neuen Passwörter stimmen nicht überein.'); return; }
    const err = changePassword(curPw, newPw);
    if (err) { pwSave.showError(err); return; }
    pwSave.showSaved('Passwort geändert!');
    setCurPw(''); setNewPw(''); setConfPw('');
  }

  // ── Logout ──
  function handleLogout() { logout(); navigate('/'); }

  const displayName = userName || profile.name || 'Nutzer';

  return (
    <div className={styles.page}>
      <div className="container">

        {/* ── Page Header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.avatar}>{displayName.charAt(0).toUpperCase()}</div>
          <div>
            <h1 className={styles.name}>{displayName}</h1>
            <p className={styles.tagline}>{userEmail}</p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────
            SECTION 1 · NAME
        ───────────────────────────────────────────────────── */}
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Name</h2>
          {nameEdit ? (
            <div className={styles.inlineEdit}>
              <input
                className={styles.textInput}
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                autoFocus
                maxLength={60}
              />
              <div className={styles.inlineActions}>
                <Button size="sm" variant="primary" onClick={handleNameSave}>
                  Speichern
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setNameEdit(false); setNameVal(displayName); }}>
                  Abbrechen
                </Button>
              </div>
              {nameSave.state === 'error' && <p className={styles.errorMsg}>{nameSave.msg}</p>}
            </div>
          ) : (
            <div className={styles.inlineView}>
              <span className={styles.inlineValue}>{displayName}</span>
              <button className={styles.editBtn} onClick={() => setNameEdit(true)}>Bearbeiten</button>
              {nameSave.state === 'saved' && <span className={styles.savedInline}>{nameSave.msg}</span>}
            </div>
          )}
        </Card>

        {/* ─────────────────────────────────────────────────────
            SECTION 2 · KÖRPERDATEN
        ───────────────────────────────────────────────────── */}
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Körperdaten</h2>

          <p className={styles.fieldLabel}>Geschlecht</p>
          <div className={styles.chipGrid}>
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={[styles.chip, gender === opt.value ? styles.chipActive : ''].join(' ')}
                onClick={() => setGender(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className={styles.bodyRow}>
            <div className={styles.bodyField}>
              <label className={styles.fieldLabel}>Alter</label>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  className={styles.numInput}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={10} max={99}
                  placeholder="25"
                />
                <span className={styles.inputUnit}>Jahre</span>
              </div>
            </div>
            <div className={styles.bodyField}>
              <label className={styles.fieldLabel}>Größe</label>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  className={styles.numInput}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min={100} max={250}
                  placeholder="175"
                />
                <span className={styles.inputUnit}>cm</span>
              </div>
            </div>
            <div className={styles.bodyField}>
              <label className={styles.fieldLabel}>Gewicht</label>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  className={styles.numInput}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min={30} max={300}
                  placeholder="75"
                />
                <span className={styles.inputUnit}>kg</span>
              </div>
            </div>
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: 'var(--space-4)' }}>Aktivitätslevel</p>
          <div className={styles.activityGrid}>
            {ACTIVITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={[styles.activityCard, activity === opt.value ? styles.activityCardActive : ''].join(' ')}
                onClick={() => setActivity(opt.value)}
              >
                <span className={styles.activityLabel}>{opt.label}</span>
                <span className={styles.activityDesc}>{opt.desc}</span>
              </button>
            ))}
          </div>

          <div className={styles.sectionActions}>
            {bodySave.state === 'saved' && <span className={styles.savedInline}>{bodySave.msg}</span>}
            {bodySave.state === 'error' && <p className={styles.errorMsg}>{bodySave.msg}</p>}
            <Button variant="primary" size="sm" onClick={handleBodySave} disabled={!bodyChanged}>
              Körperdaten speichern
            </Button>
          </div>
        </Card>

        {/* ─────────────────────────────────────────────────────
            SECTION 3 · TRAININGS-PRÄFERENZEN
        ───────────────────────────────────────────────────── */}
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Trainings-Präferenzen</h2>

          <p className={styles.fieldLabel}>Ziel</p>
          <div className={styles.chipGrid}>
            {GOAL_OPTIONS.map((opt) => (
              <button key={opt.value} type="button"
                className={[styles.chip, goal === opt.value ? styles.chipActive : ''].join(' ')}
                onClick={() => setGoal(opt.value)}>
                <span>{opt.marker}</span><span>{opt.label}</span>
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: 'var(--space-4)' }}>Fitness-Level</p>
          <div className={styles.levelGrid}>
            {LEVEL_OPTIONS.map((opt) => (
              <button key={opt.value} type="button"
                className={[styles.levelCard, level === opt.value ? styles.levelCardActive : ''].join(' ')}
                onClick={() => setLevel(opt.value)}>
                <span className={styles.levelLabel}>{opt.label}</span>
                <span className={styles.levelDesc}>{opt.desc}</span>
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: 'var(--space-4)' }}>Trainingstage / Woche</p>
          <div className={styles.daysRow}>
            {[2, 3, 4, 5, 6].map((d) => (
              <button key={d} type="button"
                className={[styles.dayBtn, trainingDays === d ? styles.dayBtnActive : ''].join(' ')}
                onClick={() => setTrainingDays(d)}>
                {d}x
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: 'var(--space-4)' }}>Equipment</p>
          <div className={styles.chipGrid}>
            {EQUIPMENT_OPTIONS.map((opt) => (
              <button key={opt.value} type="button"
                className={[styles.chip, equipment === opt.value ? styles.chipActive : ''].join(' ')}
                onClick={() => setEquipment(opt.value)}>
                {opt.label}
              </button>
            ))}
          </div>

          <p className={styles.fieldLabel} style={{ marginTop: 'var(--space-4)' }}>Ernährungs-Präferenz</p>
          <div className={styles.chipGrid}>
            {DIET_OPTIONS.map((opt) => (
              <button key={opt.value} type="button"
                className={[styles.chip, diet === opt.value ? styles.chipActive : ''].join(' ')}
                onClick={() => setDiet(opt.value)}>
                {opt.label}
              </button>
            ))}
          </div>

          <div className={styles.sectionActions}>
            {prefSave.state === 'saved' && <span className={styles.savedInline}>{prefSave.msg}</span>}
            <Button variant="primary" size="sm" onClick={handlePrefSave} disabled={!prefChanged}>
              Präferenzen speichern
            </Button>
          </div>
        </Card>

        {/* ─────────────────────────────────────────────────────
            SECTION 4 · PASSWORT ÄNDERN
        ───────────────────────────────────────────────────── */}
        <Card className={styles.section}>
          <h2 className={styles.sectionTitle}>Passwort ändern</h2>

          <div className={styles.pwField}>
            <label className={styles.fieldLabel}>Aktuelles Passwort</label>
            <div className={styles.pwWrap}>
              <input
                type={showCur ? 'text' : 'password'}
                className={styles.textInput}
                value={curPw}
                onChange={(e) => setCurPw(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button type="button" className={styles.showToggle}
                onClick={() => setShowCur((v) => !v)}>
                {showCur ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div className={styles.pwField}>
            <label className={styles.fieldLabel}>Neues Passwort</label>
            <div className={styles.pwWrap}>
              <input
                type={showNew ? 'text' : 'password'}
                className={styles.textInput}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                autoComplete="new-password"
                placeholder="Min. 8 Zeichen"
              />
              <button type="button" className={styles.showToggle}
                onClick={() => setShowNew((v) => !v)}>
                {showNew ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div className={styles.pwField}>
            <label className={styles.fieldLabel}>Neues Passwort bestätigen</label>
            <input
              type="password"
              className={[styles.textInput, confPw && confPw !== newPw ? styles.inputError : ''].join(' ')}
              value={confPw}
              onChange={(e) => setConfPw(e.target.value)}
              autoComplete="new-password"
              placeholder="Wiederholen"
            />
            {confPw && confPw !== newPw && (
              <p className={styles.fieldHint}>Passwörter stimmen nicht überein.</p>
            )}
          </div>

          <div className={styles.sectionActions}>
            {pwSave.state === 'saved' && <span className={styles.savedInline}>{pwSave.msg}</span>}
            {pwSave.state === 'error'  && <p className={styles.errorMsg}>{pwSave.msg}</p>}
            <Button variant="primary" size="sm" onClick={handlePwSave}
              disabled={!curPw || !newPw || !confPw}>
              Passwort ändern
            </Button>
          </div>
        </Card>

        {/* ─────────────────────────────────────────────────────
            DANGER ZONE · ABMELDEN
        ───────────────────────────────────────────────────── */}
        <Card className={styles.dangerZone}>
          <h2 className={styles.dangerTitle}>Sitzung beenden</h2>
          <p className={styles.dangerText}>
            Alle lokalen Daten bleiben erhalten – du wirst nur abgemeldet.
          </p>
          <Button variant="danger" size="sm" onClick={handleLogout}>
            Abmelden
          </Button>
        </Card>

      </div>
    </div>
  );
}
