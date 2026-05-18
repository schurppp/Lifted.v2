/*
  Zentrale TypeScript-Typen für LiftED
  --------------------------------------
  Warum: Alle Geschäftsobjekte an einem Ort definiert – so hat jede
  Komponente und jeder Service dieselbe "Sprache". TypeScript erzwingt
  korrekte Datenstrukturen zur Compile-Zeit, nicht erst zur Laufzeit.
*/

// ─── Nutzer & Auth ──────────────────────────────────────────────────────────

export type Goal =
  | 'muscle'      // Muskelaufbau
  | 'fat-loss'    // Fettabbau
  | 'recomp'      // Body Recomp
  | 'health'      // Allgemeine Gesundheit
  | 'knowledge';  // Wissen aufbauen

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'gym' | 'home' | 'minimal';
export type DietPreference = 'standard' | 'vegetarian' | 'vegan' | 'lowcarb' | 'highprotein';

// Neue Typen für Modul 02: Meals – Personen-Daten für den Algorithmus
export type Gender = 'male' | 'female' | 'diverse';
export type ActivityLevel =
  | 'sedentary'    // kaum Bewegung (Bürojob)
  | 'light'        // leichte Aktivität 1–3x/Woche
  | 'moderate'     // moderate Aktivität 3–5x/Woche
  | 'active'       // intensive Aktivität 6–7x/Woche
  | 'very_active'; // sehr intensiv / körperlicher Job

export interface UserProfile {
  id: string;
  name: string;
  goal: Goal;
  level: FitnessLevel;
  daysPerWeek: number;          // 2–6
  equipment: Equipment;
  dietPreference: DietPreference;
  learningFocus: string[];      // IDs der bevorzugten Lernmodule
  onboardingCompleted: boolean;
  joinedAt: string;             // ISO date string
  // Personen-Daten (Modul 02: Meals – Anmeldung II)
  gender?: Gender;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  activityLevel?: ActivityLevel;
}

// Standard-Profil für neuen Nutzer – wird im Onboarding befüllt
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-1',
  name: 'Gast',
  goal: 'health',
  level: 'beginner',
  daysPerWeek: 3,
  equipment: 'gym',
  dietPreference: 'standard',
  learningFocus: [],
  onboardingCompleted: false,
  joinedAt: new Date().toISOString(),
};

// ─── Training ────────────────────────────────────────────────────────────────

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;           // z.B. "8-12" oder "30s"
  restSeconds: number;
  muscleGroup: string;
  isWarmup: boolean;
  notes?: string;         // Ausführungshinweis
}

export interface TrainingDay {
  dayIndex: number;       // 0 = Montag, 6 = Sonntag
  label: string;          // z.B. "Push", "Beine", "Full Body"
  durationMinutes: number;
  focus: string;          // kurze Beschreibung des Schwerpunkts
  exercises: Exercise[];
  isRestDay: boolean;
}

export interface TrainingPlan {
  id: string;
  name: string;           // "Full Body", "Push Pull Legs", "Upper Lower"
  shortName: string;      // "FB", "PPL", "UL"
  level: FitnessLevel;
  daysPerWeek: number;
  goals: Goal[];          // für welche Ziele geeignet
  description: string;
  totalWeeks: number;
  days: TrainingDay[];    // immer 7 Einträge (inkl. Ruhetage)
}

// Fortschritts-Tracking pro Tag
export interface TrainingLog {
  date: string;           // ISO date string
  planId: string;
  dayIndex: number;
  completed: boolean;
  perceivedEffort?: 1 | 2 | 3 | 4 | 5; // RPE 1–5
}

// ─── Ernährung ───────────────────────────────────────────────────────────────

export interface NutritionInfo {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type RecipeTag =
  | 'vegetarian' | 'vegan' | 'high-protein' | 'low-carb'
  | 'meal-prep'  | 'quick'  | 'budget'       | 'gluten-free';

export interface Ingredient {
  amount: string;    // z.B. "200g" oder "1 EL"
  item: string;      // z.B. "Hähnchenbrust"
}

export interface Recipe {
  id: string;
  name: string;
  image: string;     // Pfad zu /img/meals/...
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  nutrition: NutritionInfo;  // pro Portion
  tags: RecipeTag[];
  goals: Goal[];             // für welche Ziele geeignet
  mealType: MealType;
  ingredients: Ingredient[];
  steps: string[];
  tip?: string;              // optionaler Koch-Tipp
}

export interface ShoppingItem {
  id: string;
  text: string;
  checked: boolean;
  recipeId?: string;         // woher der Artikel kommt
}

// ─── Lernen ──────────────────────────────────────────────────────────────────

export type SubjectArea = 'mathematik' | 'programmierung' | 'rechnungslegung';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];      // immer 4 Antwortoptionen
  correctIndex: number;   // 0–3
  explanation: string;    // wird nach Antwort angezeigt
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;        // Lehrtext (plain text, Absätze durch \n\n getrennt)
  quiz: QuizQuestion[];
}

export interface LearningModule {
  id: string;
  title: string;
  subject: SubjectArea;
  description: string;
  icon: string;           // Emoji-Icon für schnelle Wiedererkennung
  color: string;          // Akzentfarbe für die Modul-Karte
  totalLessons: number;
  estimatedHours: number;
  lessons: Lesson[];
}

// Fortschritts-Tracking pro Modul
export interface LearningProgress {
  moduleId: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // lessonId → Prozent korrekt
  lastStudiedAt?: string;
}

// ─── UI-Zustände (explizit gefordert laut Skript) ───────────────────────────

/*
  Warum: Das Skript fordert Loading, Error und Empty States für jede
  Seite. Dieser generische Typ macht sie typsicher und wiederverwendbar.
*/
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: LoadingState;
  data: T | null;
  error: string | null;
}
