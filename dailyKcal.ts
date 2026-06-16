// grundumsatz.ts

export type Geschlecht = "m" | "w";

export interface GrundumsatzParams {
    geschlecht: Geschlecht;
    gewicht: number; // in kg
    groesse: number; // in cm
    alter: number;   // in vollen Jahren
}

/**
 * Berechnet den täglichen Grundumsatz (BMR) nach der
 * revidierten Harris-Benedict-Formel (Roza & Shizgal, 1984).
 *
 * @param params - Geschlecht, Gewicht (kg), Größe (cm), Alter (Jahre)
 * @returns Grundumsatz in kcal/Tag, gerundet auf 2 Nachkommastellen
 */
export function berechneGrundumsatz(params: GrundumsatzParams): number {
    const { geschlecht, gewicht, groesse, alter } = params;

    validiereEingaben(params);

    const bmr =
        geschlecht === "m"
            ? 88.362 + 13.397 * gewicht + 4.799 * groesse - 5.677 * alter
            : 447.593 + 9.247 * gewicht + 3.098 * groesse - 4.330 * alter;

    return Math.round(bmr * 100) / 100;
}

/**
 * Prüft die Eingabewerte auf Plausibilität.
 */
function validiereEingaben({ geschlecht, gewicht, groesse, alter }: GrundumsatzParams): void {
    if (geschlecht !== "m" && geschlecht !== "w") {
        throw new Error("Geschlecht muss 'm' oder 'w' sein.");
    }
    if (gewicht <= 0) {
        throw new Error("Gewicht muss größer als 0 sein.");
    }
    if (groesse <= 0) {
        throw new Error("Größe muss größer als 0 sein.");
    }
    if (alter < 0 || !Number.isInteger(alter)) {
        throw new Error("Alter muss eine ganze Zahl >= 0 sein.");
    }
}