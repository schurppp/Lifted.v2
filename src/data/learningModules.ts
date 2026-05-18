/*
  Statische Lerndaten für LiftED
  --------------------------------
  Drei Module passend zu den Lernbereichen aus Semester 1.
  Warum diese Struktur: Lektion → Inhalt → Quiz entspricht dem
  Mastery-Modell aus der Marktanalyse (Duolingo/Khan Academy Prinzip).
*/

import type { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  // ─── MATHEMATIK ─────────────────────────────────────────────────────────────
  {
    id: 'mathematik',
    title: 'Mathematik',
    subject: 'mathematik',
    description: 'Grundlagen der Wirtschaftsmathematik: Analysis, Lineare Algebra und Statistik für Business Engineers.',
    icon: '📐',
    color: '#F97316',
    totalLessons: 3,
    estimatedHours: 2,
    lessons: [
      {
        id: 'mathe-1',
        title: 'Differentialrechnung – Grundlagen',
        durationMinutes: 6,
        content: `Die Ableitung einer Funktion beschreibt, wie schnell sich ein Funktionswert ändert.\n\nDie Ableitung f'(x) einer Funktion f(x) gibt die momentane Änderungsrate an einem Punkt x an.\n\nGrundregeln:\n• Potenzregel: f(x) = xⁿ → f'(x) = n · xⁿ⁻¹\n• Konstantenregel: f(x) = c → f'(x) = 0\n• Summenregel: (f + g)' = f' + g'\n\nBeispiel: f(x) = 3x² + 2x + 5\nf'(x) = 6x + 2\n\nAnwendung in der BWL: Grenzkosten sind die Ableitung der Kostenfunktion. Sie geben an, wie stark die Kosten steigen, wenn eine weitere Einheit produziert wird.`,
        quiz: [
          {
            id: 'q-mathe-1-1',
            question: 'Was ist die Ableitung von f(x) = 4x³?',
            options: ['f\'(x) = 4x²', 'f\'(x) = 12x²', 'f\'(x) = 12x³', 'f\'(x) = 4x'],
            correctIndex: 1,
            explanation: 'Potenzregel: n · xⁿ⁻¹ → 3 · 4x² = 12x²',
          },
          {
            id: 'q-mathe-1-2',
            question: 'Was beschreiben Grenzkosten in der BWL?',
            options: ['Den Gesamtpreis aller Güter', 'Die Kosten der letzten produzierten Einheit', 'Den Gewinn pro Einheit', 'Die Fixkosten eines Unternehmens'],
            correctIndex: 1,
            explanation: 'Grenzkosten = Ableitung der Kostenfunktion = Kosten der marginal letzten Einheit.',
          },
        ],
      },
      {
        id: 'mathe-2',
        title: 'Lineare Gleichungssysteme',
        durationMinutes: 7,
        content: `Lineare Gleichungssysteme (LGS) bestehen aus mehreren Gleichungen mit mehreren Unbekannten.\n\nLösungsverfahren:\n1. Einsetzungsverfahren: Eine Variable durch eine andere ausdrücken\n2. Gleichsetzungsverfahren: Beide Gleichungen gleichsetzen\n3. Gauß-Elimination: Systematisches Eliminieren von Variablen\n\nBeispiel:\n2x + y = 10\nx - y = 2\n\nAddition: 3x = 12 → x = 4\nEinsetzen: y = 10 - 2·4 = 2\n\nAnwendung in der BWL: Marktgleichgewicht (Angebot = Nachfrage), Break-Even-Analyse, Ressourcenoptimierung.`,
        quiz: [
          {
            id: 'q-mathe-2-1',
            question: 'Wie viele Lösungen hat ein LGS mit 2 parallelen Geraden?',
            options: ['Genau eine', 'Unendlich viele', 'Keine', 'Zwei'],
            correctIndex: 2,
            explanation: 'Parallele Geraden schneiden sich nicht → das LGS hat keine Lösung (unlösbar).',
          },
          {
            id: 'q-mathe-2-2',
            question: 'Was beschreibt der Break-Even-Point mathematisch?',
            options: ['Kostenfunktion = 0', 'Erlösfunktion = Kostenfunktion', 'Gewinnfunktion > 0', 'Ableitung der Kostenfunktion = 1'],
            correctIndex: 1,
            explanation: 'Im Break-Even-Punkt sind Erlöse gleich Kosten – der Schnittpunkt beider Funktionen.',
          },
        ],
      },
      {
        id: 'mathe-3',
        title: 'Deskriptive Statistik',
        durationMinutes: 5,
        content: `Deskriptive Statistik beschreibt und fasst Datensätze zusammen.\n\nLagemaße:\n• Arithmetisches Mittel: Summe aller Werte / Anzahl\n• Median: Mittlerer Wert in sortierter Reihe\n• Modus: Häufigster Wert\n\nStreuungsmaße:\n• Varianz: Mittlere quadratische Abweichung vom Mittelwert\n• Standardabweichung: Wurzel der Varianz\n\nWichtig: Der Median ist robuster gegenüber Ausreißern als das Mittel. Deshalb wird z.B. das Medianeinkommen bevorzugt gegenüber dem Durchschnittseinkommen.`,
        quiz: [
          {
            id: 'q-mathe-3-1',
            question: 'Welches Lagemaß ist am robustesten gegenüber Ausreißern?',
            options: ['Arithmetisches Mittel', 'Varianz', 'Median', 'Standardabweichung'],
            correctIndex: 2,
            explanation: 'Der Median ignoriert extreme Werte – nur die Mitte der sortierten Reihe zählt.',
          },
          {
            id: 'q-mathe-3-2',
            question: 'Was ist die Standardabweichung?',
            options: ['Quadrat der Varianz', 'Wurzel der Varianz', 'Mittelwert der Abstände', 'Maximum minus Minimum'],
            correctIndex: 1,
            explanation: 'Standardabweichung = √Varianz, damit das Ergebnis dieselbe Einheit wie die Daten hat.',
          },
        ],
      },
    ],
  },

  // ─── PROGRAMMIERUNG ─────────────────────────────────────────────────────────
  {
    id: 'programmierung',
    title: 'Programmierung',
    subject: 'programmierung',
    description: 'JavaScript & TypeScript Grundlagen, React-Konzepte und moderne Web-Entwicklung für Business Engineers.',
    icon: '💻',
    color: '#0F766E',
    totalLessons: 3,
    estimatedHours: 3,
    lessons: [
      {
        id: 'prog-1',
        title: 'JavaScript – Grundkonzepte',
        durationMinutes: 7,
        content: `JavaScript ist die Sprache des Webs. Jeder Browser kann JavaScript ausführen.\n\nWichtige Konzepte:\n\n1. Variablen\nconst x = 10;      // unveränderlich\nlet y = 20;        // veränderlich\n\n2. Funktionen\nconst add = (a, b) => a + b;\n\n3. Arrays & Objekte\nconst zahlen = [1, 2, 3];\nconst person = { name: "Anna", alter: 22 };\n\n4. Asynchronität (wichtig!)\nDas Laden von Daten passiert nicht sofort. Promises und async/await lösen das:\nconst data = await fetchData();\n\nWarum TypeScript: JS kennt keine Typen – TypeScript fügt sie hinzu und fängt Fehler vor der Ausführung ab.`,
        quiz: [
          {
            id: 'q-prog-1-1',
            question: 'Was ist der Unterschied zwischen const und let in JavaScript?',
            options: ['Es gibt keinen', 'const kann nicht neu zugewiesen werden', 'let ist schneller', 'const gilt nur in Funktionen'],
            correctIndex: 1,
            explanation: 'const verhindert Neuzuweisung – der Wert bleibt fest. let erlaubt Änderungen.',
          },
          {
            id: 'q-prog-1-2',
            question: 'Warum wird TypeScript gegenüber JavaScript empfohlen?',
            options: ['Weil es schneller läuft', 'Weil es Typen hat und Fehler früher erkennt', 'Weil es einfacher zu lernen ist', 'Weil es keine Abhängigkeiten hat'],
            correctIndex: 1,
            explanation: 'Typen machen Code robuster – Fehler werden zur Compile-Zeit erkannt, nicht erst zur Laufzeit.',
          },
        ],
      },
      {
        id: 'prog-2',
        title: 'React – Komponenten & State',
        durationMinutes: 7,
        content: `React ist eine JavaScript-Bibliothek für interaktive Benutzeroberflächen.\n\nKernprinzip: Alles ist eine Komponente.\n\nBeispiel einer Komponente:\nfunction Button({ label, onClick }) {\n  return <button onClick={onClick}>{label}</button>;\n}\n\nState (Zustand):\nDer Zustand einer Komponente bestimmt, was angezeigt wird.\nconst [count, setCount] = useState(0);\n\nWenn setCount aufgerufen wird, rendert React die Komponente neu.\n\nWichtige Regel: State niemals direkt ändern!\n// Falsch:\ncount = count + 1;\n// Richtig:\nsetCount(count + 1);`,
        quiz: [
          {
            id: 'q-prog-2-1',
            question: 'Was passiert, wenn setCount() in React aufgerufen wird?',
            options: ['Nichts', 'Die ganze Seite lädt neu', 'Die Komponente rendert sich neu', 'Der Browser cached den Wert'],
            correctIndex: 2,
            explanation: 'React reagiert auf State-Änderungen mit einem Re-Render der betroffenen Komponente.',
          },
          {
            id: 'q-prog-2-2',
            question: 'Was ist eine React-Komponente?',
            options: ['Eine CSS-Klasse', 'Eine Funktion, die JSX zurückgibt', 'Ein HTML-Element', 'Ein TypeScript-Interface'],
            correctIndex: 1,
            explanation: 'Eine Komponente ist eine Funktion, die beschreibt, wie etwas aussehen soll (JSX).',
          },
        ],
      },
      {
        id: 'prog-3',
        title: 'Routing & Navigation in React',
        durationMinutes: 5,
        content: `React ist eine Single-Page-Application (SPA) – nur eine HTML-Datei, aber mehrere "Seiten".\n\nReact Router ermöglicht Navigation ohne Seiten-Reload:\n\n// Route definieren\n<Route path="/dashboard" element={<Dashboard />} />\n\n// Link erstellen\n<Link to="/dashboard">Dashboard</Link>\n\n// Programmatisch navigieren\nconst navigate = useNavigate();\nnavigate('/dashboard');\n\nWichtig: Protected Routes schützen Seiten vor unangemeldeten Nutzern:\nif (!isLoggedIn) return <Navigate to="/login" />;`,
        quiz: [
          {
            id: 'q-prog-3-1',
            question: 'Was ist eine Single-Page-Application (SPA)?',
            options: ['Eine Website mit nur einer Seite', 'Eine App mit einer HTML-Datei, die JS zur Navigation nutzt', 'Eine App ohne Datenbank', 'Eine mobile App'],
            correctIndex: 1,
            explanation: 'SPAs laden nur einmal HTML – JavaScript übernimmt die Navigation ohne Server-Roundtrips.',
          },
          {
            id: 'q-prog-3-2',
            question: 'Wozu dienen Protected Routes in React?',
            options: ['Performance-Optimierung', 'Schutz von Seiten vor nicht eingeloggten Nutzern', 'SEO-Verbesserung', 'Lazy Loading'],
            correctIndex: 1,
            explanation: 'Protected Routes leiten unangemeldete Nutzer zum Login um, bevor sie die Seite sehen.',
          },
        ],
      },
    ],
  },

  // ─── RECHNUNGSLEGUNG ────────────────────────────────────────────────────────
  {
    id: 'rechnungslegung',
    title: 'Rechnungslegung',
    subject: 'rechnungslegung',
    description: 'Jahresabschluss, Bilanz, GuV und externe Rechnungslegung nach HGB für angehende Business Engineers.',
    icon: '📊',
    color: '#B7F000',
    totalLessons: 3,
    estimatedHours: 2,
    lessons: [
      {
        id: 'rl-1',
        title: 'Bilanz – Grundstruktur',
        durationMinutes: 6,
        content: `Die Bilanz ist eine Momentaufnahme des Unternehmens am Stichtag.\n\nStruktur: Aktiva = Passiva (immer!)\n\nAktivseite (Mittelverwendung):\n• Anlagevermögen: Gebäude, Maschinen, Patente\n• Umlaufvermögen: Vorräte, Forderungen, Kasse\n\nPassivseite (Mittelherkunft):\n• Eigenkapital: Einlagen + einbehaltene Gewinne\n• Fremdkapital: Bankschulden, Lieferantenverbindlichkeiten\n\nMerksatz: Die Aktivseite sagt WAS das Unternehmen hat, die Passivseite sagt WOHER das Geld kam.\n\nBilanzsumme = Summe Aktiva = Summe Passiva`,
        quiz: [
          {
            id: 'q-rl-1-1',
            question: 'Was steht auf der Aktivseite einer Bilanz?',
            options: ['Herkunft des Kapitals', 'Verwendung des Kapitals (Vermögen)', 'Erträge und Aufwendungen', 'Nur Eigenkapital'],
            correctIndex: 1,
            explanation: 'Aktiva = Mittelverwendung = das Vermögen (was das Unternehmen besitzt/verwendet).',
          },
          {
            id: 'q-rl-1-2',
            question: 'Was gilt immer für die Bilanz?',
            options: ['Aktiva > Passiva', 'Aktiva = Passiva', 'Eigenkapital > Fremdkapital', 'Umlaufvermögen > Anlagevermögen'],
            correctIndex: 1,
            explanation: 'Die Bilanzsumme ist immer ausgeglichen: Aktiva = Passiva ist das Grundprinzip der doppelten Buchführung.',
          },
        ],
      },
      {
        id: 'rl-2',
        title: 'Gewinn- und Verlustrechnung (GuV)',
        durationMinutes: 6,
        content: `Die GuV zeigt, wie der Gewinn oder Verlust in einer Periode entstanden ist.\n\nPrinzip: Erträge − Aufwendungen = Jahresüberschuss (Gewinn) oder Jahresfehlbetrag (Verlust)\n\nGesamtkostenverfahren (GKV):\nUmsatzerlöse\n+ Bestandsveränderungen\n− Materialaufwand\n− Personalaufwand\n− Abschreibungen\n− Sonstige Aufwendungen\n= Ergebnis vor Zinsen (EBIT)\n− Zinsaufwand\n= Ergebnis vor Steuern (EBT)\n− Steuern\n= Jahresüberschuss\n\nWichtig: Die GuV ist eine Stromgröße (Zeitraum), die Bilanz eine Bestandsgröße (Stichtag).`,
        quiz: [
          {
            id: 'q-rl-2-1',
            question: 'Was ist EBIT?',
            options: ['Earnings Before Income Tax', 'Earnings Before Interest and Taxes', 'Eigenkapital Before Insolvenz und Tilgung', 'Erlöse Brutto Inklusive Transport'],
            correctIndex: 1,
            explanation: 'EBIT = Earnings Before Interest and Taxes = Ergebnis vor Zinsen und Steuern.',
          },
          {
            id: 'q-rl-2-2',
            question: 'Was ist der Unterschied zwischen Bilanz und GuV?',
            options: ['Keiner', 'Bilanz = Stichtag, GuV = Zeitraum', 'Bilanz = Gewinn, GuV = Verlust', 'GuV ist freiwillig'],
            correctIndex: 1,
            explanation: 'Die Bilanz ist eine Momentaufnahme, die GuV zeigt Erträge und Aufwendungen über eine Periode.',
          },
        ],
      },
      {
        id: 'rl-3',
        title: 'Grundsätze ordnungsmäßiger Buchführung (GoB)',
        durationMinutes: 5,
        content: `Die GoB sind die Spielregeln für die Buchführung in Deutschland.\n\nWichtigste Grundsätze:\n\n1. Richtigkeit: Buchungen müssen den tatsächlichen Sachverhalt abbilden\n2. Vollständigkeit: Alle Geschäftsvorfälle müssen erfasst werden\n3. Vorsichtsprinzip: Im Zweifel vorsichtig bewerten (Risiken früher erfassen als Chancen)\n4. Kontinuitätsprinzip: Bilanzierungsmethoden sollen beibehalten werden\n5. Going-Concern: Buchführung geht von Unternehmensfortführung aus\n\nWarum wichtig: Gläubigerschutz! Die Bilanz soll ein realistisches Bild der Lage zeigen – nicht schöner, nicht schlechter.`,
        quiz: [
          {
            id: 'q-rl-3-1',
            question: 'Was bedeutet das Vorsichtsprinzip in der Rechnungslegung?',
            options: ['Gewinne früh ausweisen, Verluste spät', 'Verluste früh ausweisen, Gewinne erst wenn sicher', 'Immer den höchsten Wert ansetzen', 'Keine Schätzungen verwenden'],
            correctIndex: 1,
            explanation: 'Vorsichtsprinzip = im Zweifel konservativ: Risiken früh erfassen, Chancen erst bei Sicherheit.',
          },
          {
            id: 'q-rl-3-2',
            question: 'Welchem Zweck dienen die GoB hauptsächlich?',
            options: ['Steueroptimierung', 'Gläubigerschutz und realistisches Lagebild', 'Maximierung des ausgewiesenen Gewinns', 'Vereinfachung der Buchhaltung'],
            correctIndex: 1,
            explanation: 'GoB schützen Gläubiger: Das Unternehmen soll seine wirtschaftliche Lage weder besser noch schlechter darstellen.',
          },
        ],
      },
    ],
  },
];
