import type { Exercise } from "./exercises";

export function scoreExercise(ex: Exercise, user: any, ctx: any) {

    let score = 0;

    // Priorität Muskel
    if (user.prioMuskeln.includes(ex.primaryMuscle)) {
        score += 100;
    }

    // Split passt
    if (ctx.allowedMuscles.includes(ex.primaryMuscle)) {
        score += 50;
    } else {
        score -= 30;
    }

    // Verletzungen
    if (user.injuries.some((i: string) => ex.injuryRisk.includes(i))) {
        return -9999;
    }

    // Compound Bonus
    if (ex.type === "compound") {
        score += 20;
    }

    return score;
}