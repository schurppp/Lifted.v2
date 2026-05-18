import type { MuscleGroup } from "./muscles";

export type ExerciseType = "compound" | "isolation";

export interface Exercise {
    name: string;
    primaryMuscle: MuscleGroup;
    type: ExerciseType;
    injuryRisk: string[];
}

const exercises: Exercise[] = [
    // =========================
    // BRUST
    // =========================
    { name: "Brustpresse", primaryMuscle: "Brust", type: "compound", injuryRisk: ["Schulter"] },
    { name: "PecDec", primaryMuscle: "Brust", type: "compound", injuryRisk: [] },
    { name: "Bankdrücken", primaryMuscle: "Brust", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Schrägbankdrücken", primaryMuscle: "Brust", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Liegestütze", primaryMuscle: "Brust", type: "compound", injuryRisk: ["Schulter"] },

    // =========================
    // RÜCKEN
    // =========================
    { name: "Klimmzüge", primaryMuscle: "Lat", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Latziehen", primaryMuscle: "Lat", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Rudern Kabel", primaryMuscle: "Lat", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Überzüge", primaryMuscle: "Lat", type: "isolation", injuryRisk: [] },
    { name: "Rudern Breit", primaryMuscle: "Trapez", type: "compound", injuryRisk: ["Schulter"] },
    { name: "Shrug", primaryMuscle: "Trapez", type: "isolation", injuryRisk: [] },

    // =========================
    // SCHULTER
    // =========================
    { name: "Schulterpresse", primaryMuscle: "SchulterFront", type: "isolation", injuryRisk: ["Schulter"] },
    { name: "Seitheben", primaryMuscle: "SchulterSide", type: "isolation", injuryRisk: ["Schulter"] },
    { name: "Reverse Butter Fly", primaryMuscle: "SchulterRear", type: "isolation", injuryRisk: ["Schulter"] },


    // =========================
    // ARME
    // =========================
    { name: "Bizepscurls", primaryMuscle: "Bizeps", type: "isolation", injuryRisk: [] },
    { name: "Hammer Curls", primaryMuscle: "Bizeps", type: "isolation", injuryRisk: [] },
    { name: "Overheadpress", primaryMuscle: "Trizeps", type: "isolation", injuryRisk: [] },
    { name: "Trizepsdrücken", primaryMuscle: "Trizeps", type: "isolation", injuryRisk: [] },

    // =========================
    // BEINE
    // =========================
    { name: "Kniebeugen", primaryMuscle: "Quadrizeps", type: "compound", injuryRisk: ["Knie"] },
    { name: "Beinpresse", primaryMuscle: "Quadrizeps", type: "compound", injuryRisk: [] },
    { name: "Deadlift", primaryMuscle: "Lower_Back", type: "compound", injuryRisk: ["Back"] },
    { name: "Stif Leg Deadlift", primaryMuscle: "Lower_Back", type: "compound", injuryRisk: ["Back"] },
    { name: "Hip Thrust", primaryMuscle: "Glutes", type: "compound", injuryRisk: [] },
    { name: "Beinstrecker", primaryMuscle: "RecktusFemoris", type: "compound", injuryRisk: [] },
    { name: "Beinbeuger", primaryMuscle: "Hamstrings", type: "isolation", injuryRisk: [] },
    { name: "Wadenheben", primaryMuscle: "Waden", type: "isolation", injuryRisk: [] },

    // =========================
    // CORE
    // =========================
    { name: "Crunches", primaryMuscle: "Core", type: "isolation", injuryRisk: [] },
    { name: "Plank", primaryMuscle: "Core", type: "isolation", injuryRisk: [] }
];

export default exercises;