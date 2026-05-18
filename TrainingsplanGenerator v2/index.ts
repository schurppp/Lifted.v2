import User from "./user";
import { buildPlan } from "./planBuilder";

import { getSplits } from "./splitEngine";

const user = new User(
    "Ben",
    3,
    "Muskelaufbau",
    "Oberkörper",
    [],
    ["Schulter"],
    "anfänger",
    25,
    "männlich"
);

// 🔥 WICHTIG: Splits jetzt separat holen
const splits = getSplits(user);

// 🔥 PlanBuilder braucht jetzt 2 Argumente
const result = buildPlan(user, splits);

console.log("=== TRAININGSPLAN ===");

result.forEach(day => {

    console.log("\n====================");
    console.log(day.title);
    console.log("====================");

    day.exercises.forEach((ex: any) => {
        let sets;
        sets = 0;
        if(day.title.includes("Fullbody") ) {
            sets = 1;
        } else sets = ex.sets;
        console.log(`${ex.name} - ${sets} Sätze - ${ex.reps} Wdh`);
    });

    if(user.trainingsziel === "Fettverlust") {
        console.log("Cardio - 15-30 Minuten")
    }

});

if(user.trainingstageAbgezogen > 0) {

    console.log("\n==== CARDIOPLAN ====");
    console.log(user.trainingstageAbgezogen, "Tage 60min laufen");
    console.log("====================");

}
