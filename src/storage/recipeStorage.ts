/*
  Recipe Service
  ---------------
  Warum ein Service statt direktem Datenzugriff: Komponenten sollen nicht
  wissen, WO die Daten herkommen. Wenn wir später eine API einbinden,
  ändern wir nur diesen Service – keine einzige Komponente.
*/

import { RECIPES } from '../data/recipes';
import type { Recipe, Goal, MealType, RecipeTag } from '../types';

// Filter-Parameter als Interface – typsicher und selbstdokumentierend
export interface RecipeFilter {
  goal?: Goal;
  mealType?: MealType;
  tags?: RecipeTag[];
  maxCalories?: number;
  search?: string;
}

/** Alle Rezepte zurückgeben */
export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

/** Einzelnes Rezept per ID – gibt undefined zurück, wenn nicht gefunden */
export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}

/** Rezepte nach Filter-Kriterien filtern */
export function filterRecipes(filter: RecipeFilter): Recipe[] {
  return RECIPES.filter((recipe) => {
    // Ziel-Filter
    if (filter.goal && !recipe.goals.includes(filter.goal)) return false;

    // Mahlzeit-Typ-Filter
    if (filter.mealType && recipe.mealType !== filter.mealType) return false;

    // Tag-Filter: Mindestens einer der gewünschten Tags muss passen
    if (filter.tags && filter.tags.length > 0) {
      const hasTag = filter.tags.some((tag) => recipe.tags.includes(tag));
      if (!hasTag) return false;
    }

    // Kalorien-Limit
    if (filter.maxCalories && recipe.nutrition.calories > filter.maxCalories) return false;

    // Freitext-Suche im Namen
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!recipe.name.toLowerCase().includes(q)) return false;
    }

    return true;
  });
}

/** Rezepte für einen bestimmten Ernährungsplan (7 Tage) generieren */
export function generateWeeklyMealPlan(goal: Goal): Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }> {
  const breakfasts = RECIPES.filter((r) => r.mealType === 'breakfast' && r.goals.includes(goal));
  const lunches    = RECIPES.filter((r) => r.mealType === 'lunch'     && r.goals.includes(goal));
  const dinners    = RECIPES.filter((r) => r.mealType === 'dinner'    && r.goals.includes(goal));

  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  // Fallback: wenn nicht genug zielspezifische Rezepte da sind, alle nehmen
  const bf = breakfasts.length > 0 ? breakfasts : RECIPES.filter((r) => r.mealType === 'breakfast');
  const lu = lunches.length > 0    ? lunches    : RECIPES.filter((r) => r.mealType === 'lunch');
  const di = dinners.length > 0    ? dinners    : RECIPES.filter((r) => r.mealType === 'dinner');

  return days.reduce<Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }>>((plan, day, i) => {
    plan[day] = {
      breakfast: bf[i % bf.length],
      lunch:     lu[i % lu.length],
      dinner:    di[i % di.length],
    };

    return plan;
  }, {});
}
