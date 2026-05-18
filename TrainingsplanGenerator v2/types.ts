export type Muscle =
    | "Brust"
    | "Lat"
    | "Trapez"
    | "Bizeps"
    | "Trizeps"
    | "Schulter"
    | "Quadrizeps"
    | "Hamstrings"
    | "Glutes"
    | "Waden"
    | "Core"
    | "Adductor"
    | "Lower_Back";

export type SplitType =
    | "Push"
    | "Pull"
    | "Legs"
    | "Upper"
    | "Lower"
    | "Fullbody";

export interface Exercise {
    name: string;
    primaryMuscle: Muscle;
    type: "compound" | "isolation";
    injuryRisk: string[];
}

export interface UserType {
    name: string;
    trainingstage: number;
    trainingsziel: string;
    prioMuskelGruppe: string;
    prioMuskeln: Muscle[];
    injuries: string[];
    level: "anfänger" | "fortgeschritten";
    alter: number;
    geschlecht: string;
}

export interface Context {
    split: SplitType;
    focus: string;
    allowedMuscles: Muscle[];
}