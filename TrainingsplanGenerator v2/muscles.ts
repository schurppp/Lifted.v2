
// =========================
// MUSCLE TYPES
// =========================

export type MuscleGroup =
    | "Brust"
    | "Lat"
    | "Trapez"
    | "SchulterFront"
    | "SchulterSide"
    | "SchulterRear"
    | "Bizeps"
    | "Trizeps"
    | "Quadrizeps"
    | "RecktusFemoris"
    | "Hamstrings"
    | "Glutes"
    | "Waden"
    | "Adductor"
    | "Core"
    | "Lower_Back";

export type MuscleCategory = "Upper" | "Lower";
export type PushPull = "Push" | "Pull" | "Both";

// =========================
// MUSCLE META DATABASE
// =========================

export const muscleMeta: Record<
    MuscleGroup,
    { category: MuscleCategory; role: PushPull }
> = {

    // =========================
    // UPPER BODY
    // =========================

    Brust: { category: "Upper", role: "Push" },

    Lat: { category: "Upper", role: "Pull" },
    Trapez: { category: "Upper", role: "Pull" },
    Lower_Back: { category: "Lower", role: "Pull" },

    SchulterFront: { category: "Upper", role: "Push" },
    SchulterSide: { category: "Upper", role: "Push" },
    SchulterRear: { category: "Upper", role: "Pull" },

    Bizeps: { category: "Upper", role: "Pull" },
    Trizeps: { category: "Upper", role: "Push" },

    Core: { category: "Lower", role: "Pull" },

    // =========================
    // LOWER BODY
    // =========================

    Quadrizeps: { category: "Lower", role: "Push" },
    RecktusFemoris: { category: "Lower", role: "Push" },
    Hamstrings: { category: "Lower", role: "Pull" },
    Glutes: { category: "Lower", role: "Push" },
    Waden: { category: "Lower", role: "Push" },
    Adductor: { category: "Lower", role: "Push" }
};

// =========================
// STRING MAP (LEGACY SUPPORT)
// =========================

export const muscleMap = {
    Brust: "Brust",

    Lat: "Lat",
    Trapez: "Trapez",
    Lower_Back: "Lower_Back",

    // Schulter Split
    FrontDelt: "SchulterFront",
    SideDelt: "SchulterSide",
    RearDelt: "SchulterRear",

    Schulter: "SchulterFront", // fallback

    Bizeps: "Bizeps",
    Trizeps: "Trizeps",

    Quadrizeps: "Quadrizeps",
    RecktusFemoris: "RecktusFemoris",

    Hamstrings: "Hamstrings",
    Glutes: "Glutes",
    Waden: "Waden",
    Adductor: "Adductor",

    Core: "Core",

    Latissimus: "Lat",
    Traps: "Trapez",
    Bauch: "Core",
    Abs: "Core",
    Gesäß: "Glutes",
    Beinbeuger: "Hamstrings",
    Calves: "Waden",
    Adducktor: "Adductor"
} as const;

// =========================
// TYPESAFE KEY FIX
// =========================

export type MuscleKey = keyof typeof muscleMap;

// =========================
// NORMALIZER
// =========================

export function normalizeMuscle(muscle: string): MuscleGroup {
    return muscleMap[muscle as MuscleKey] || (muscle as MuscleGroup);
}

// =========================
// META ACCESS HELPER
// =========================

export function getMuscleMeta(muscle: string) {
    const normalized = normalizeMuscle(muscle);
    return muscleMeta[normalized];
}

// =========================
// OPTIONAL: GROUP HELPER (NÜTZLICH FÜR PLANBUILDER)
// =========================

export function getMuscleCategory(muscle: string): MuscleCategory {
    const meta = getMuscleMeta(muscle);
    return meta.category;
}

export function getMuscleRole(muscle: string): PushPull {
    const meta = getMuscleMeta(muscle);
    return meta.role;
}