export function buildAusdauerPlan(user: any, splits: any[]) {

    const result: any[] = [];

    const removedDays = user.trainingstageAbgezogen || 0;

    console.log("Abgezogene Trainingstage:", removedDays);

    // 🔥 Cardio-Tage aus abgezogenen Tagen erzeugen
    const cardioDays = Array.from({ length: removedDays }).map((_, i) => ({
        title: `Cardio Tag ${i + 1}`,
        exercises: [
            {
                name: "Laufband",
                sets: 1,
                reps: "60 min @ 10 km/h (Pace)"
            }
        ]
    }));

    // 🔥 normale Splits behalten
    for (const [index, entry] of splits.entries()) {

        result.push({
            title: `Tag ${index + 1} - ${entry.split}`,
            exercises: entry.exercises || []
        });
    }

    // 🔥 Cardio hinten anhängen
    return [...result, ...cardioDays];
}