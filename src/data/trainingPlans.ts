/*
  Statische Trainingsplandaten für LiftED
  ----------------------------------------
  Drei bewährte Pläne: Full Body (FB), Push Pull Legs (PPL), Upper Lower (UL).
  Warum statisch: Kein Server nötig, Skript-Vorgabe erfüllt, offline nutzbar.
*/

import type { TrainingPlan } from '../types';

export const TRAINING_PLANS: TrainingPlan[] = [
  // ─── FULL BODY ──────────────────────────────────────────────────────────────
  {
    id: 'fb',
    name: 'Full Body',
    shortName: 'FB',
    level: 'beginner',
    daysPerWeek: 3,
    goals: ['health', 'muscle', 'fat-loss'],
    description: 'Trainiert alle Muskelgruppen in jeder Einheit. Ideal für Einsteiger: hohe Frequenz bei überschaubarem Volumen.',
    totalWeeks: 8,
    days: [
      {
        dayIndex: 0, label: 'Full Body A', durationMinutes: 45, focus: 'Ganzkörper – Kraft', isRestDay: false,
        exercises: [
          { id: 'fb-squat',    name: 'Kniebeuge',         sets: 3, reps: '8-10', restSeconds: 90, muscleGroup: 'Beine',  isWarmup: false },
          { id: 'fb-bench',    name: 'Bankdrücken',        sets: 3, reps: '8-10', restSeconds: 90, muscleGroup: 'Brust',  isWarmup: false },
          { id: 'fb-row',      name: 'Rudern am Kabel',    sets: 3, reps: '10-12',restSeconds: 75, muscleGroup: 'Rücken', isWarmup: false },
          { id: 'fb-ohp',      name: 'Schulterdrücken',    sets: 3, reps: '10-12',restSeconds: 75, muscleGroup: 'Schulter',isWarmup: false },
          { id: 'fb-curl',     name: 'Bizepscurl',         sets: 2, reps: '12-15',restSeconds: 60, muscleGroup: 'Arme',   isWarmup: false },
          { id: 'fb-plank',    name: 'Plank',              sets: 3, reps: '30s',  restSeconds: 45, muscleGroup: 'Core',   isWarmup: false },
        ],
      },
      { dayIndex: 1, label: 'Ruhetag', durationMinutes: 0, focus: 'Aktive Erholung', isRestDay: true, exercises: [] },
      {
        dayIndex: 2, label: 'Full Body B', durationMinutes: 45, focus: 'Ganzkörper – Hypertrophie', isRestDay: false,
        exercises: [
          { id: 'fb-rdl',      name: 'Romanian Deadlift',  sets: 3, reps: '8-10', restSeconds: 90, muscleGroup: 'Beine',  isWarmup: false },
          { id: 'fb-inc-press',name: 'Schrägbankdrücken',  sets: 3, reps: '10-12',restSeconds: 75, muscleGroup: 'Brust',  isWarmup: false },
          { id: 'fb-pulldown', name: 'Latziehen',           sets: 3, reps: '10-12',restSeconds: 75, muscleGroup: 'Rücken', isWarmup: false },
          { id: 'fb-lateral',  name: 'Seitheben',           sets: 3, reps: '12-15',restSeconds: 60, muscleGroup: 'Schulter',isWarmup: false },
          { id: 'fb-tricep',   name: 'Trizepsstrecken',     sets: 2, reps: '12-15',restSeconds: 60, muscleGroup: 'Arme',   isWarmup: false },
          { id: 'fb-crunch',   name: 'Crunch',              sets: 3, reps: '15-20',restSeconds: 45, muscleGroup: 'Core',   isWarmup: false },
        ],
      },
      { dayIndex: 3, label: 'Ruhetag', durationMinutes: 0, focus: 'Aktive Erholung', isRestDay: true, exercises: [] },
      {
        dayIndex: 4, label: 'Full Body C', durationMinutes: 50, focus: 'Ganzkörper – Ausdauer', isRestDay: false,
        exercises: [
          { id: 'fb-lunge',    name: 'Ausfallschritte',     sets: 3, reps: '12/Seite', restSeconds: 75, muscleGroup: 'Beine',  isWarmup: false },
          { id: 'fb-dips',     name: 'Dips',                sets: 3, reps: '10-12',    restSeconds: 75, muscleGroup: 'Brust',  isWarmup: false },
          { id: 'fb-seated-row', name: 'Rudern sitzend',    sets: 3, reps: '12-15',    restSeconds: 60, muscleGroup: 'Rücken', isWarmup: false },
          { id: 'fb-face-pull', name: 'Face Pull',          sets: 3, reps: '15',       restSeconds: 60, muscleGroup: 'Schulter',isWarmup: false },
          { id: 'fb-hammer',   name: 'Hammercurl',          sets: 2, reps: '12-15',    restSeconds: 60, muscleGroup: 'Arme',   isWarmup: false },
          { id: 'fb-hollow',   name: 'Hollow Hold',         sets: 3, reps: '20s',      restSeconds: 45, muscleGroup: 'Core',   isWarmup: false },
        ],
      },
      { dayIndex: 5, label: 'Ruhetag', durationMinutes: 0, focus: 'Erholung', isRestDay: true, exercises: [] },
      { dayIndex: 6, label: 'Ruhetag', durationMinutes: 0, focus: 'Erholung', isRestDay: true, exercises: [] },
    ],
  },

  // ─── PUSH PULL LEGS ─────────────────────────────────────────────────────────
  {
    id: 'ppl',
    name: 'Push Pull Legs',
    shortName: 'PPL',
    level: 'intermediate',
    daysPerWeek: 6,
    goals: ['muscle'],
    description: 'Sechs Tage-Split: Push (Brust, Schulter, Trizeps), Pull (Rücken, Bizeps) und Beine. Maximales Volumen für Muskelaufbau.',
    totalWeeks: 12,
    days: [
      {
        dayIndex: 0, label: 'Push', durationMinutes: 55, focus: 'Brust, Schulter, Trizeps', isRestDay: false,
        exercises: [
          { id: 'ppl-bench',    name: 'Bankdrücken',         sets: 4, reps: '6-8',  restSeconds: 120, muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ppl-inc',      name: 'Schrägbankdrücken',   sets: 3, reps: '8-10', restSeconds: 90,  muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ppl-fly',      name: 'Kabelflyes',          sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ppl-ohp',      name: 'Schulterdrücken',     sets: 4, reps: '8-10', restSeconds: 90,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ppl-lateral',  name: 'Seitheben',           sets: 4, reps: '12-15',restSeconds: 60,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ppl-tricep-pd',name: 'Trizeps Pushdown',    sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Trizeps', isWarmup: false },
          { id: 'ppl-overhead', name: 'Overhead Extension',  sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Trizeps', isWarmup: false },
        ],
      },
      {
        dayIndex: 1, label: 'Pull', durationMinutes: 55, focus: 'Rücken, Bizeps', isRestDay: false,
        exercises: [
          { id: 'ppl-deadlift', name: 'Kreuzheben',          sets: 4, reps: '5',    restSeconds: 180, muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-pullup',   name: 'Klimmzug',            sets: 4, reps: '6-10', restSeconds: 120, muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-row',      name: 'Langhantelrudern',     sets: 3, reps: '8-10', restSeconds: 90,  muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-facepull', name: 'Face Pull',            sets: 3, reps: '15',   restSeconds: 60,  muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-curl',     name: 'Bizepscurl',           sets: 4, reps: '10-12',restSeconds: 75,  muscleGroup: 'Bizeps', isWarmup: false },
          { id: 'ppl-hammer',   name: 'Hammercurl',           sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Bizeps', isWarmup: false },
        ],
      },
      {
        dayIndex: 2, label: 'Beine', durationMinutes: 60, focus: 'Quad, Hamstring, Waden', isRestDay: false,
        exercises: [
          { id: 'ppl-squat',    name: 'Kniebeuge',           sets: 4, reps: '6-8',  restSeconds: 180, muscleGroup: 'Quad',    isWarmup: false },
          { id: 'ppl-leg-press',name: 'Beinpresse',          sets: 3, reps: '10-12',restSeconds: 90,  muscleGroup: 'Quad',    isWarmup: false },
          { id: 'ppl-rdl',      name: 'Romanian Deadlift',   sets: 4, reps: '8-10', restSeconds: 90,  muscleGroup: 'Hamstring',isWarmup: false },
          { id: 'ppl-curl-leg', name: 'Beinbeuger liegend',  sets: 3, reps: '12-15',restSeconds: 75,  muscleGroup: 'Hamstring',isWarmup: false },
          { id: 'ppl-calf',     name: 'Wadendrücken',        sets: 4, reps: '15-20',restSeconds: 60,  muscleGroup: 'Waden',   isWarmup: false },
          { id: 'ppl-abduct',   name: 'Abduktor',            sets: 3, reps: '15',   restSeconds: 60,  muscleGroup: 'Hüfte',   isWarmup: false },
        ],
      },
      { dayIndex: 3, label: 'Ruhetag', durationMinutes: 0, focus: 'Aktive Erholung', isRestDay: true, exercises: [] },
      {
        dayIndex: 4, label: 'Push 2', durationMinutes: 55, focus: 'Brust, Schulter, Trizeps', isRestDay: false,
        exercises: [
          { id: 'ppl-inc2',     name: 'Schrägbankdrücken',   sets: 4, reps: '6-8',  restSeconds: 120, muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ppl-fly2',     name: 'Butterfly',           sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ppl-arnold',   name: 'Arnold Press',        sets: 4, reps: '10-12',restSeconds: 90,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ppl-front',    name: 'Frontheben',          sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ppl-skull',    name: 'Skull Crusher',       sets: 3, reps: '10-12',restSeconds: 75,  muscleGroup: 'Trizeps', isWarmup: false },
        ],
      },
      {
        dayIndex: 5, label: 'Pull 2', durationMinutes: 55, focus: 'Rücken, Bizeps', isRestDay: false,
        exercises: [
          { id: 'ppl-lat2',     name: 'Latziehen',           sets: 4, reps: '8-10', restSeconds: 90,  muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-row2',     name: 'Seilzugrudern',       sets: 3, reps: '10-12',restSeconds: 75,  muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-shrug',    name: 'Schulterzucken',      sets: 3, reps: '15',   restSeconds: 60,  muscleGroup: 'Rücken', isWarmup: false },
          { id: 'ppl-curl2',    name: 'Scot-Curl',           sets: 4, reps: '10-12',restSeconds: 75,  muscleGroup: 'Bizeps', isWarmup: false },
          { id: 'ppl-conc',     name: 'Konzentrationscurl',  sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Bizeps', isWarmup: false },
        ],
      },
      { dayIndex: 6, label: 'Ruhetag', durationMinutes: 0, focus: 'Erholung', isRestDay: true, exercises: [] },
    ],
  },

  // ─── UPPER LOWER ────────────────────────────────────────────────────────────
  {
    id: 'ul',
    name: 'Upper Lower',
    shortName: 'UL',
    level: 'intermediate',
    daysPerWeek: 4,
    goals: ['muscle', 'recomp'],
    description: 'Vier Tage: zwei Oberkörper- und zwei Unterkörpereinheiten. Gute Balance aus Frequenz und Volumen.',
    totalWeeks: 10,
    days: [
      {
        dayIndex: 0, label: 'Oberkörper A', durationMinutes: 55, focus: 'Horizontal drücken & ziehen', isRestDay: false,
        exercises: [
          { id: 'ul-bench',  name: 'Bankdrücken',          sets: 4, reps: '6-8',  restSeconds: 120, muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ul-row',    name: 'Langhantelrudern',      sets: 4, reps: '6-8',  restSeconds: 120, muscleGroup: 'Rücken',  isWarmup: false },
          { id: 'ul-inc',    name: 'Schrägbankdrücken KB',  sets: 3, reps: '10-12',restSeconds: 90,  muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ul-lat',    name: 'Latziehen',             sets: 3, reps: '10-12',restSeconds: 90,  muscleGroup: 'Rücken',  isWarmup: false },
          { id: 'ul-lateral',name: 'Seitheben',             sets: 3, reps: '15',   restSeconds: 60,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ul-curl',   name: 'Bizepscurl',            sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Arme',    isWarmup: false },
          { id: 'ul-tri',    name: 'Trizepsstrecken',       sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Arme',    isWarmup: false },
        ],
      },
      {
        dayIndex: 1, label: 'Unterkörper A', durationMinutes: 55, focus: 'Quad-dominiert', isRestDay: false,
        exercises: [
          { id: 'ul-squat',  name: 'Kniebeuge',             sets: 4, reps: '6-8',  restSeconds: 180, muscleGroup: 'Quad',    isWarmup: false },
          { id: 'ul-rdl',    name: 'Romanian Deadlift',     sets: 3, reps: '8-10', restSeconds: 120, muscleGroup: 'Hamstring',isWarmup: false },
          { id: 'ul-press',  name: 'Beinpresse',            sets: 3, reps: '10-12',restSeconds: 90,  muscleGroup: 'Quad',    isWarmup: false },
          { id: 'ul-curl-l', name: 'Beinbeuger',            sets: 3, reps: '12-15',restSeconds: 75,  muscleGroup: 'Hamstring',isWarmup: false },
          { id: 'ul-calf',   name: 'Wadendrücken',          sets: 4, reps: '15-20',restSeconds: 60,  muscleGroup: 'Waden',   isWarmup: false },
        ],
      },
      { dayIndex: 2, label: 'Ruhetag', durationMinutes: 0, focus: 'Aktive Erholung', isRestDay: true, exercises: [] },
      {
        dayIndex: 3, label: 'Oberkörper B', durationMinutes: 55, focus: 'Vertikal drücken & ziehen', isRestDay: false,
        exercises: [
          { id: 'ul-ohp',    name: 'Schulterdrücken',       sets: 4, reps: '6-8',  restSeconds: 120, muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ul-pullup', name: 'Klimmzug',              sets: 4, reps: '6-10', restSeconds: 120, muscleGroup: 'Rücken',  isWarmup: false },
          { id: 'ul-dips',   name: 'Dips',                  sets: 3, reps: '10-12',restSeconds: 90,  muscleGroup: 'Brust',   isWarmup: false },
          { id: 'ul-facepull',name: 'Face Pull',            sets: 3, reps: '15',   restSeconds: 60,  muscleGroup: 'Schulter',isWarmup: false },
          { id: 'ul-curl2',  name: 'Hammercurl',            sets: 3, reps: '12-15',restSeconds: 60,  muscleGroup: 'Arme',    isWarmup: false },
          { id: 'ul-skull',  name: 'Skull Crusher',         sets: 3, reps: '10-12',restSeconds: 75,  muscleGroup: 'Arme',    isWarmup: false },
        ],
      },
      {
        dayIndex: 4, label: 'Unterkörper B', durationMinutes: 55, focus: 'Hip-dominiert', isRestDay: false,
        exercises: [
          { id: 'ul-dead',   name: 'Kreuzheben',            sets: 4, reps: '5',    restSeconds: 180, muscleGroup: 'Rücken',  isWarmup: false },
          { id: 'ul-lunge',  name: 'Bulgarischer Split Squat',sets:3, reps: '10/Seite',restSeconds:90,muscleGroup: 'Quad',   isWarmup: false },
          { id: 'ul-hip',    name: 'Hip Thrust',            sets: 4, reps: '10-12',restSeconds: 90,  muscleGroup: 'Gesäß',   isWarmup: false },
          { id: 'ul-calf2',  name: 'Stehende Wadenheben',   sets: 4, reps: '15-20',restSeconds: 60,  muscleGroup: 'Waden',   isWarmup: false },
          { id: 'ul-plank',  name: 'Plank',                 sets: 3, reps: '30-45s',restSeconds:45,  muscleGroup: 'Core',    isWarmup: false },
        ],
      },
      { dayIndex: 5, label: 'Ruhetag', durationMinutes: 0, focus: 'Erholung', isRestDay: true, exercises: [] },
      { dayIndex: 6, label: 'Ruhetag', durationMinutes: 0, focus: 'Erholung', isRestDay: true, exercises: [] },
    ],
  },
];
