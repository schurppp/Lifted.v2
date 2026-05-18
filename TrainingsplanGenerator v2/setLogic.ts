export type SetRep = {
    sets: number;
    reps: string;
};

// =========================
// SÄTZE PRO ÜBUNG
// =========================
export function getSetsAndReps(user: any): SetRep {

    if (user.level === "anfänger") {
        return { sets: 3, reps: "8-12" };
    }

    if (user.level === "fortgeschritten") {
        return { sets: 2, reps: "4-8" };
    }

    return { sets: 2, reps: "4-8" };
}

// =========================
// MUSKEL-GESAMTLIMIT (WICHTIG FÜR PLANBUILDER)
// =========================
export function getMuscleSetLimit(user: any): number {

    if (user.level === "anfänger") {
        return 3; // max 3 Sätze pro Muskel pro Tag
    }

    if (user.level === "fortgeschritten") {
        return 2; // etwas mehr Volumen erlaubt
    }

    return 3;
}