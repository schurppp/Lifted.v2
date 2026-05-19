/**import { normalizeMuscle } from "./muscles";

export function ensureMuscleCoverage(plan: any[], allowedMuscles: string[]) {

    const result = [...plan];

    // bereits vorhandene Muskeln im Plan sammeln
    const covered = new Set(
        plan.map(ex => normalizeMuscle(ex.primaryMuscle))
    );

    allowedMuscles.forEach(muscle => {

        const normalized = normalizeMuscle(muscle);

        if (!covered.has(normalized)) {

            result.push({
                name: `Fallback ${normalized}`,
                primaryMuscle: normalized,
                sets: 3,
                reps: "10-12",
                type: "isolation",
                injuryRisk: []
            });
        }
    });

    return result;
} +*/