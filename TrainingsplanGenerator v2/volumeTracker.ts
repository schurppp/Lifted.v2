import type { MuscleGroup } from "./muscles";
import type { Exercise } from "./exercises";

export class VolumeTracker {

    private volume: Record<string, number> = {};
    private target: number;

    constructor(user: any) {
        this.target = user.level === "anfänger" ? 6 : 10;
    }

    add(ex: Exercise, sets: number) {
        const m = ex.primaryMuscle;

        if (!this.volume[m]) {
            this.volume[m] = 0;
        }

        this.volume[m] += sets;
    }

    needsMuscle(muscle: MuscleGroup) {
        return (this.volume[muscle] || 0) < this.target;
    }
}