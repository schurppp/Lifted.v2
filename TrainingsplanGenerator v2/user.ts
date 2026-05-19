import {InjuryRisk} from "./muscles";

export class User {

    name: string;
    trainingstage: number;
    trainingsziel: string;
    prioMuskelGruppe: string;
    prioMuskeln: string[];
    injuries: string[];
    level: "anfänger" | "fortgeschritten" | "pro";
    alter: number;
    geschlecht: "männlich" | "weiblich" | "divers";

    // 🔥 NEU: Debug/Info Variable
    trainingstageAbgezogen: number = 0;

    constructor(
        name: string,
        trainingstage: number,
        trainingsziel: "Muskelaufbau" | "Fettverlust" | "Ausdauer",
        prioMuskelGruppe: string,
        prioMuskeln: string[],
        injuries: InjuryRisk[],
        level: "anfänger" | "fortgeschritten" | "pro",
        alter: number,
        geschlecht: "männlich" | "weiblich" | "divers"
    ) {
        this.name = name;

        const result = this.adjustTrainingDays(trainingstage, trainingsziel);

        this.trainingstage = result.finalDays;
        this.trainingstageAbgezogen = result.removedDays;

        this.trainingsziel = trainingsziel;
        this.prioMuskelGruppe = prioMuskelGruppe;
        this.prioMuskeln = prioMuskeln;
        this.injuries = injuries;
        this.level = level;
        this.alter = alter;
        this.geschlecht = geschlecht;
    }

    // =========================
    // TRAININGSTAGE LOGIK
    // =========================
    private adjustTrainingDays(days: number, goal: string): {
        finalDays: number;
        removedDays: number;
    } {

        const g = goal.toLowerCase();

        let removed = 0;
        let final = days;

        if (g === "ausdauer") {

            if (days <= 3) {
                removed = 1;
                final = Math.max(2, days - 1);
            } else if (days <= 5) {
                removed = 2;
                final = Math.max(3, days - 2);
            } else {
                removed = 3;
                final = Math.max(3, days - 3);
            }
        }

        return {
            finalDays: final,
            removedDays: removed
        };
    }
}

export default User;