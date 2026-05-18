// grundumsatz.test.ts
import { berechneGrundumsatz, GrundumsatzParams } from "./dailyKcal.ts";

interface TestFall {
    beschreibung: string;
    eingabe: GrundumsatzParams;
    erwartet: number;
}

const testFaelle: TestFall[] = [
    {
        beschreibung: "Mann, 30 Jahre, 80 kg, 180 cm",
        eingabe: { geschlecht: "m", gewicht: 80, groesse: 180, alter: 30 },
        erwartet: 1854.71,
    },
    {
        beschreibung: "Frau, 28 Jahre, 65 kg, 168 cm",
        eingabe: { geschlecht: "w", gewicht: 65, groesse: 168, alter: 28 },
        erwartet: 1441.85,
    },
    {
        beschreibung: "Mann, 45 Jahre, 90 kg, 175 cm",
        eingabe: { geschlecht: "m", gewicht: 90, groesse: 175, alter: 45 },
        erwartet: 1875.62,
    },
    {
        beschreibung: "Frau, 60 Jahre, 70 kg, 165 cm",
        eingabe: { geschlecht: "w", gewicht: 70, groesse: 165, alter: 60 },
        erwartet: 1346.27,
    },
    {
        beschreibung: "Mann, 22 Jahre, 75 kg, 182 cm",
        eingabe: { geschlecht: "m", gewicht: 75, groesse: 182, alter: 22 },
        erwartet: 1843.40,
    },
];

function fuehreTestsAus(): void {
    console.log("=== Tests Harris-Benedict-Formel ===\n");

    let bestanden = 0;
    let fehlgeschlagen = 0;

    for (const test of testFaelle) {
        try {
            const ergebnis = berechneGrundumsatz(test.eingabe);
            const abweichung = Math.abs(ergebnis - test.erwartet);
            const ok = abweichung < 0.01;

            if (ok) {
                console.log(`✓ ${test.beschreibung}`);
                console.log(`  Ergebnis: ${ergebnis} kcal/Tag (erwartet: ${test.erwartet})\n`);
                bestanden++;
            } else {
                console.log(`✗ ${test.beschreibung}`);
                console.log(`  Ergebnis: ${ergebnis} kcal/Tag, erwartet: ${test.erwartet}`);
                console.log(`  Abweichung: ${abweichung.toFixed(2)}\n`);
                fehlgeschlagen++;
            }
        } catch (err) {
            console.log(`✗ ${test.beschreibung} – Fehler: ${(err as Error).message}\n`);
            fehlgeschlagen++;
        }
    }

    // Validierungstests (sollten Fehler werfen)
    console.log("=== Validierungstests ===\n");

    const ungueltigeFaelle: { beschreibung: string; eingabe: GrundumsatzParams }[] = [
        {
            beschreibung: "Negatives Gewicht",
            eingabe: { geschlecht: "m", gewicht: -80, groesse: 180, alter: 30 },
        },
        {
            beschreibung: "Größe = 0",
            eingabe: { geschlecht: "w", gewicht: 65, groesse: 0, alter: 28 },
        },
        {
            beschreibung: "Nicht-ganzzahliges Alter",
            eingabe: { geschlecht: "m", gewicht: 80, groesse: 180, alter: 30.5 },
        },
    ];

    for (const test of ungueltigeFaelle) {
        try {
            berechneGrundumsatz(test.eingabe);
            console.log(`✗ ${test.beschreibung} – kein Fehler geworfen\n`);
            fehlgeschlagen++;
        } catch (err) {
            console.log(`✓ ${test.beschreibung} – Fehler korrekt geworfen: ${(err as Error).message}\n`);
            bestanden++;
        }
    }

    console.log("=== Zusammenfassung ===");
    console.log(`Bestanden: ${bestanden}`);
    console.log(`Fehlgeschlagen: ${fehlgeschlagen}`);
    console.log(`Gesamt: ${bestanden + fehlgeschlagen}`);
}

fuehreTestsAus();