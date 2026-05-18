import exercises from "./exercises";
import { scoreExercise } from "./scorer";

export function selectExercises(user: any, ctx: any) {

    return exercises
        .map(ex => ({
            ...ex,
            score: scoreExercise(ex, user, ctx)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
}