export function getSplits(user: any) {

    const trainingstage = user.trainingstage;
    const focus = user.prioMuskelGruppe;
    const level = user.level;

    const fallback = [{
        split: "Fullbody",
        order: ["Upper", "Lower"]
    }];

    // =========================
    // 1 - 3 TAGE
    // =========================
    if (trainingstage <= 3) {

        if (level === "anfänger") {
            return [{
                split: "Fullbody",
                order: ["Upper", "Lower"]
            }];
        }

        if (level === "fortgeschritten") {

            if (focus === "Oberkörper") {
                return [
                    { split: "Upper", order: ["Upper"] },
                    { split: "Lower", order: ["Lower"] },
                    { split: "Upper", order: ["Upper"] }
                ];
            }

            if (focus === "Unterkörper") {
                return [
                    { split: "Lower", order: ["Lower"] },
                    { split: "Upper", order: ["Upper"] },
                    { split: "Lower", order: ["Lower"] }
                ];
            }

            return fallback;
        }

        return fallback;
    }

    // =========================
    // 4 TAGE
    // =========================
    if (trainingstage === 4) {

        if (focus === "Oberkörper") {
            return [
                { split: "Push", order: ["Upper", "Lower"] },
                { split: "Pull", order: ["Upper", "Lower"] }
            ];
        }

        if (focus === "Unterkörper") {
            return [
                { split: "Push", order: ["Lower", "Upper"] },
                { split: "Pull", order: ["Lower", "Upper"] }
            ];
        }

        return [
            { split: "Push", order: ["Upper"] },
            { split: "Pull", order: ["Upper"] }
        ];
    }

    // =========================
    // 5 TAGE
    // =========================
    if (trainingstage === 5) {

        if (focus === "Oberkörper") {
            return [
                { split: "Push", order: ["Upper"] },
                { split: "Pull", order: ["Upper"] },
                { split: "Legs", order: ["Lower"] },
                { split: "Upper", order: ["Upper"] },
                { split: "Lower", order: ["Lower"] }
            ];
        }

        if (focus === "Unterkörper") {
            return [
                { split: "Push", order: ["Lower", "Upper"] },
                { split: "Pull", order: ["Lower", "Upper"] },
                { split: "Push", order: ["Lower", "Upper"] },
                { split: "Pull", order: ["Lower", "Upper"] },
                { split: "Fullbody", order: ["Lower", "Upper"] }
            ];
        }

        return [
            { split: "Push", order: ["Upper"] },
            { split: "Pull", order: ["Upper"] },
            { split: "Legs", order: ["Lower"] },
            { split: "Upper", order: ["Upper"] },
            { split: "Lower", order: ["Lower"] }
        ];
    }

    // =========================
    // 6 TAGE
    // =========================
    if (trainingstage === 6) {

        if (focus === "Oberkörper") {
            return [
                { split: "Push", order: ["Upper"] },
                { split: "Pull", order: ["Upper"] },
                { split: "Lower", order: ["Lower"] },
                { split: "Push", order: ["Upper"] },
                { split: "Pull", order: ["Upper"] },
                { split: "Lower", order: ["Lower"] }
            ];
        }

        if (focus === "Unterkörper") {
            return [
                { split: "Push", order: ["Lower"] },
                { split: "Pull", order: ["Lower"] },
                { split: "Upper", order: ["Upper"] },
                { split: "Push", order: ["Lower"] },
                { split: "Pull", order: ["Lower"] },
                { split: "Upper", order: ["Upper"] }
            ];
        }

        return [
            { split: "Push", order: ["Upper"] },
            { split: "Pull", order: ["Upper"] },
            { split: "Legs", order: ["Lower"] },
            { split: "Upper", order: ["Upper"] },
            { split: "Lower", order: ["Lower"] },
            { split: "Fullbody", order: ["Upper", "Lower"] }
        ];
    }

    // =========================
    // SAFE FALLBACK (CRITICAL)
    // =========================
    return fallback;
}