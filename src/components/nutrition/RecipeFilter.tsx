/*
  RecipeFilter – Dynamisches Feature: Filter für Rezepte
  -------------------------------------------------------
  Warum: Dynamisches Feature #2 (laut Skript: mind. 5 dynamische Features).
  Nutzer sollen Rezepte nach Ziel, Mahlzeit und Tags filtern können.
  Wichtig: "Quick Reset"-Button – Nutzer müssen leicht zurücksetzen können.
*/
import type { RecipeFilter as FilterType } from '../../storage/recipeStorage';
import type { MealType, RecipeTag, Goal } from '../../types';
import { Button } from '../ui/Button';
import styles from './RecipeFilter.module.css';

interface RecipeFilterProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

const GOALS: { value: Goal; label: string }[] = [
  { value: 'muscle',   label: '💪 Muskelaufbau' },
  { value: 'fat-loss', label: '🔥 Fettabbau'    },
  { value: 'recomp',   label: '⚖️ Recomp'       },
  { value: 'health',   label: '❤️ Gesundheit'   },
];

const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: '🌅 Frühstück' },
  { value: 'lunch',     label: '☀️ Mittagessen' },
  { value: 'dinner',    label: '🌙 Abendessen' },
  { value: 'snack',     label: '🍎 Snack' },
];

const TAGS: { value: RecipeTag; label: string }[] = [
  { value: 'high-protein', label: 'Viel Protein' },
  { value: 'vegetarian',   label: 'Vegetarisch'  },
  { value: 'vegan',        label: 'Vegan'        },
  { value: 'low-carb',     label: 'Low-Carb'     },
  { value: 'meal-prep',    label: 'Meal Prep'    },
  { value: 'quick',        label: 'Schnell'      },
  { value: 'gluten-free',  label: 'Glutenfrei'   },
];

export function RecipeFilter({ filter, onChange }: RecipeFilterProps) {
  function setGoal(goal: Goal | undefined) {
    onChange({ ...filter, goal });
  }
  function setMealType(mealType: MealType | undefined) {
    onChange({ ...filter, mealType });
  }
  function toggleTag(tag: RecipeTag) {
    const current = filter.tags ?? [];
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onChange({ ...filter, tags: next });
  }
  function reset() {
    onChange({});
  }

  const hasFilter = !!(filter.goal || filter.mealType || (filter.tags && filter.tags.length > 0) || filter.search);

  return (
    <div className={styles.wrap}>
      {/* Suche */}
      <input
        type="search"
        placeholder="Rezept suchen…"
        value={filter.search ?? ''}
        onChange={(e) => onChange({ ...filter, search: e.target.value })}
        className={styles.searchInput}
        aria-label="Rezept suchen"
      />

      {/* Ziel-Filter */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Ziel</p>
        <div className={styles.chips}>
          {GOALS.map((g) => (
            <button
              key={g.value}
              className={[styles.chip, filter.goal === g.value ? styles.chipActive : ''].join(' ')}
              onClick={() => setGoal(filter.goal === g.value ? undefined : g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mahlzeit-Filter */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Mahlzeit</p>
        <div className={styles.chips}>
          {MEAL_TYPES.map((m) => (
            <button
              key={m.value}
              className={[styles.chip, filter.mealType === m.value ? styles.chipActive : ''].join(' ')}
              onClick={() => setMealType(filter.mealType === m.value ? undefined : m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tag-Filter */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Eigenschaften</p>
        <div className={styles.chips}>
          {TAGS.map((t) => (
            <button
              key={t.value}
              className={[styles.chip, filter.tags?.includes(t.value) ? styles.chipActive : ''].join(' ')}
              onClick={() => toggleTag(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset – nur sichtbar wenn aktiver Filter */}
      {hasFilter && (
        <Button variant="ghost" size="sm" onClick={reset}>
          ✕ Filter zurücksetzen
        </Button>
      )}
    </div>
  );
}
