import {Injuries, MuscleGroup} from "./muscles";

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
    { name: "Brustpresse", primaryMuscle: "Brust", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Brust] },
    { name: "PecDec", primaryMuscle: "Brust", type: "compound", injuryRisk: [Injuries.Brust] },
    { name: "Bankdrücken", primaryMuscle: "Brust", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Brust] },
    { name: "Schrägbankdrücken", primaryMuscle: "Brust", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Brust] },
    { name: "Liegestütze", primaryMuscle: "Brust", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Brust] },

    // =========================
    // RÜCKEN
    // =========================
    { name: "Klimmzüge", primaryMuscle: "Lat", type: "compound", injuryRisk: [Injuries.Lower_Back, Injuries.Schulter] },
    { name: "Latziehen", primaryMuscle: "Lat", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Lower_Back] },
    { name: "Rudern Eng", primaryMuscle: "Lat", type: "compound", injuryRisk: [ Injuries.Schulter, Injuries.Lower_Back] },
    { name: "Überzüge", primaryMuscle: "Lat", type: "isolation", injuryRisk: [Injuries.Lower_Back,] },
    { name: "Rudern Breit", primaryMuscle: "Trapez", type: "compound", injuryRisk: [ Injuries.Schulter] },
    { name: "Shrug", primaryMuscle: "Trapez", type: "isolation", injuryRisk: [Injuries.Lower_Back] },

    // =========================
    // SCHULTER
    // =========================
    { name: "Schulterpresse", primaryMuscle: "SchulterFront", type: "isolation", injuryRisk: [ Injuries.Schulter, Injuries.Trizeps] },
    { name: "Seitheben", primaryMuscle: "SchulterSide", type: "isolation", injuryRisk: [ Injuries.Schulter] },
    { name: "Reverse Butter Fly", primaryMuscle: "SchulterRear", type: "isolation", injuryRisk: [ Injuries.Schulter] },


    // =========================
    // ARME
    // =========================
    { name: "Bizepscurls", primaryMuscle: "Bizeps", type: "isolation", injuryRisk: [Injuries.Bizeps] },
    { name: "Hammer Curls", primaryMuscle: "Bizeps", type: "isolation", injuryRisk: [Injuries.Bizeps] },
    { name: "Overheadpress", primaryMuscle: "Trizeps", type: "isolation", injuryRisk: [Injuries.Trizeps] },
    { name: "Trizepsdrücken", primaryMuscle: "Trizeps", type: "isolation", injuryRisk: [Injuries.Trizeps] },

    // =========================
    // BEINE
    // =========================
    { name: "Kniebeugen", primaryMuscle: "Quadrizeps", type: "compound", injuryRisk: [Injuries.Knie] },
    { name: "Beinpresse", primaryMuscle: "Quadrizeps", type: "compound", injuryRisk: [Injuries.Knie] },
    { name: "Deadlift", primaryMuscle: "Lower_Back", type: "compound", injuryRisk: [Injuries.Lower_Back, Injuries.Knie] },
    { name: "Stiff Leg Deadlift", primaryMuscle: "Lower_Back", type: "compound", injuryRisk: [Injuries.Lower_Back] },
    { name: "Hip Thrust", primaryMuscle: "Glutes", type: "compound", injuryRisk: [Injuries.Core, Injuries.Lower_Back] },
    { name: "Beinstrecker", primaryMuscle: "RecktusFemoris", type: "compound", injuryRisk: [Injuries.Knie] },
    { name: "Beinbeuger", primaryMuscle: "Hamstrings", type: "isolation", injuryRisk: [] },
    { name: "Wadenheben", primaryMuscle: "Waden", type: "isolation", injuryRisk: [] },

    // =========================
    // CORE
    // =========================
    { name: "Crunches", primaryMuscle: "Core", type: "isolation", injuryRisk: [Injuries.Core] },
    { name: "Plank", primaryMuscle: "Core", type: "isolation", injuryRisk: [Injuries.Core] }
];

export default exercises;