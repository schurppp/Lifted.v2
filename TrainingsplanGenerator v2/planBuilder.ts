import exercises from "./exercises";
import { getMuscleMeta, normalizeMuscle } from "./muscles";
import { getSetsAndReps, getMuscleSetLimit } from "./setLogic";

export function buildPlan(user: any, splits: any[]) {

    const plan: any[] = [];

    // =========================
    // PRIORITY MAP (USER PREF)
    // =========================
    const prio = new Map<string, number>();
    (user.prioMuskeln || []).forEach((m: string, i: number) => {
        prio.set(m, i);
    });

    for (const [index, entry] of splits.entries()) {

        const selected: any[] = [];

        const { sets, reps } = getSetsAndReps(user);



        // =========================
        // MUSCLE VOLUME LIMIT
        // =========================
        const MAX_SETS_PER_MUSCLE = getMuscleSetLimit(user);
        const muscleSets: Record<string, number> = {};

        for (const category of entry.order) {

            // =========================
            // SORTING MUST BE INSIDE CATEGORY LOOP (FIX!)
            // =========================
            const sortedExercises = [...exercises].sort((a, b) => {

                const aMuscle = normalizeMuscle(a.primaryMuscle);
                const bMuscle = normalizeMuscle(b.primaryMuscle);

                const aPrio = prio.has(aMuscle) ? prio.get(aMuscle)! : 999;
                const bPrio = prio.has(bMuscle) ? prio.get(bMuscle)! : 999;

                return aPrio - bPrio;
            });

            for (const ex of sortedExercises) {

                const meta = getMuscleMeta(ex.primaryMuscle);
                const muscle = normalizeMuscle(ex.primaryMuscle);

                // =========================
                // 1. CATEGORY FILTER (Upper / Lower)
                // =========================
                if (meta.category !== category) continue;

                // =========================
                // 2. PUSH / PULL FILTER
                // =========================
                if (entry.split === "Push" && meta.role === "Pull") continue;
                if (entry.split === "Pull" && meta.role === "Push") continue;

                // =========================
                // 2. INJURY FILTER
                // =========================
                if (
                    ex.injuryRisk &&
                    ex.injuryRisk.some(risk =>
                        user.injuries.indexOf(risk) !== -1
                    )
                ) {
                    continue;
                }

                // =========================
                // 3. VOLUME CONTROL
                // =========================
                const currentSets = muscleSets[muscle] || 0;

                if (currentSets + sets > MAX_SETS_PER_MUSCLE) {
                    continue;
                }

                // =========================
                // 4. DUPLICATE CONTROL
                // =========================
                if (selected.some(e => e.name === ex.name)) continue;

                // =========================
                // 5. ADD EXERCISE
                // =========================
                selected.push({
                    name: ex.name,
                    primaryMuscle: meta,
                    sets,
                    reps
                });

                // =========================
                // 6. UPDATE MUSCLE VOLUME
                // =========================
                muscleSets[muscle] = currentSets + sets;
            }
        }

        plan.push({
            title: `Tag ${index + 1} - ${entry.split}`,
            exercises: selected
        });
    }

    return plan;
}