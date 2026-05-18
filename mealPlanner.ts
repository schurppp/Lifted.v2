// ============================================================
// LiftED – Meal Plan Algorithm
// Version 1.0

// ------- Types -------

export interface Macros {
    protein: number; // grams
    carbs: number;   // grams
    fat: number;     // grams
}

export interface Recipe {
    id: number;
    title: string;
    tags: string[];
    ingredients: string[];
    instructions: string;
    calories: number;
    macros: Macros;
}

/** Meal categories that structure a day */
export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

/** Daily nutritional targets */
export interface DailyTargets {
    calories: number;
    macros: Macros;
}

/** Optional filters for the plan */
export interface PlanFilters {
    vegetarian?: boolean;
    vegan?: boolean;
}

/** Result of generateDayPlan */
export interface DayPlan {
    recipeIndices: number[];       // indices into the recipes array
    totalCalories: number;
    totalMacros: Macros;
    breakdown: Record<MealSlot, number>; // slot → recipe index
}

// ------- Default Targets (Placeholder) -------
// TODO: Replace with actual user data from UserProfile in future versions.

const DEFAULT_TARGETS: DailyTargets = {
    calories: 2500,
    macros: {
        protein: 180, // g  (~29% of kcal)
        carbs: 270,   // g  (~43% of kcal)
        fat: 75,      // g  (~27% of kcal)
    },
};

// ------- Slot Configuration -------

const SLOT_TAGS: Record<MealSlot, string> = {
    breakfast: "breakfast",
    lunch: "lunch",
    dinner: "dinner",
    snack: "snack",
};

/**
 * Approximate calorie share per meal slot.
 * Must sum to 1.0.
 */
const SLOT_CALORIE_SHARE: Record<MealSlot, number> = {
    breakfast: 0.25,  // ~625 kcal
    lunch: 0.35,      // ~875 kcal
    dinner: 0.30,     // ~750 kcal
    snack: 0.10,      // ~250 kcal
};

// ------- Core Helpers -------

/** Filter recipes by meal slot tag and optional diet filters */
function filterBySlot(
    recipes: Recipe[],
    slot: MealSlot,
    filters: PlanFilters
): Recipe[] {
    return recipes.filter((r) => {
        if (!r.tags.includes(SLOT_TAGS[slot])) return false;
        if (filters.vegan && !r.tags.includes("vegan")) return false;
        if (filters.vegetarian && !r.tags.includes("vegetarian") && !r.tags.includes("vegan")) return false;
        return true;
    });
}

/**
 * Pick the recipe from candidates whose calorie count is closest
 * to the target calorie amount for this slot.
 */
function pickBestFit(candidates: Recipe[], targetCalories: number): Recipe {
    return candidates.reduce((best, current) => {
        const currentDiff = Math.abs(current.calories - targetCalories);
        const bestDiff = Math.abs(best.calories - targetCalories);
        return currentDiff < bestDiff ? current : best;
    });
}

/** Sum two Macros objects */
function addMacros(a: Macros, b: Macros): Macros {
    return {
        protein: a.protein + b.protein,
        carbs: a.carbs + b.carbs,
        fat: a.fat + b.fat,
    };
}

// ------- Main Algorithm -------

/**
 * Generate a one-day meal plan as a list of recipe indices.
 *
 * @param recipes   Full recipe array (loaded from recipes.json)
 * @param targets   Daily nutritional targets (defaults to 2500 kcal placeholder)
 * @param filters   Optional diet filters (vegetarian, vegan)
 * @returns         DayPlan with recipeIndices, totals, and slot breakdown
 */
export function generateDayPlan(
    recipes: Recipe[],
    targets: DailyTargets = DEFAULT_TARGETS,
    filters: PlanFilters = {}
): DayPlan {
    const slots: MealSlot[] = ["breakfast", "lunch", "dinner", "snack"];
    const breakdown: Partial<Record<MealSlot, number>> = {};

    for (const slot of slots) {
        const targetCaloriesForSlot = targets.calories * SLOT_CALORIE_SHARE[slot];
        const candidates = filterBySlot(recipes, slot, filters);

        if (candidates.length === 0) {
            throw new Error(
                `No recipes available for slot "${slot}" with the given filters.`
            );
        }

        const chosen = pickBestFit(candidates, targetCaloriesForSlot);
        breakdown[slot] = chosen.id;
    }

    // Collect results
    const recipeIndices = Object.values(breakdown) as number[];

    let totalCalories = 0;
    let totalMacros: Macros = { protein: 0, carbs: 0, fat: 0 };

    for (const id of recipeIndices) {
        const recipe = recipes.find((r) => r.id === id);
        if (!recipe) continue;
        totalCalories += recipe.calories;
        totalMacros = addMacros(totalMacros, recipe.macros);
    }

    return {
        recipeIndices,
        totalCalories,
        totalMacros,
        breakdown: breakdown as Record<MealSlot, number>,
    };
}

// ------- Usage Example (can be removed in production) -------

/*
import recipes from "./recipes.json";

const plan = generateDayPlan(recipes);
console.log("Today's meal plan:");
console.log("Recipe IDs:", plan.recipeIndices);
console.log("Total calories:", plan.totalCalories);
console.log("Total macros:", plan.totalMacros);
console.log("Breakdown:", plan.breakdown);

// With vegan filter:
const veganPlan = generateDayPlan(recipes, DEFAULT_TARGETS, { vegan: true });
*/