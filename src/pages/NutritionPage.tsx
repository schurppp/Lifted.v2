/*
  NutritionPage – Ernährungs-Hub
  ---------------------------------
  Zwei Tabs: Rezeptsuche (mit Filter) und Einkaufsliste.
  Dynamische Features: Filter-System + Einkaufsliste.
*/
import { useState, useMemo } from 'react';
import { filterRecipes } from '../storage/recipeStorage';
import type { RecipeFilter } from '../storage/recipeStorage';
import { RecipeCard } from '../components/nutrition/RecipeCard';
import { RecipeFilter as RecipeFilterUI } from '../components/nutrition/RecipeFilter';
import { ShoppingList } from '../components/nutrition/ShoppingList';
import { EmptyState } from '../components/ui/EmptyState';
import { useShoppingList } from '../hooks/useShoppingList';
import { getRecipeById } from '../storage/recipeStorage';
import styles from './NutritionPage.module.css';

type Tab = 'rezepte' | 'einkaufsliste';

export function NutritionPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rezepte');
  const [filter, setFilter]       = useState<RecipeFilter>({});
  const [showFilter, setShowFilter] = useState(false);
  const { addRecipeIngredients } = useShoppingList();

  // Gefilterte Rezepte – useMemo verhindert unnötige Neuberechnungen
  const recipes = useMemo(() => filterRecipes(filter), [filter]);

  function handleAddToList(recipeId: string) {
    const recipe = getRecipeById(recipeId);
    if (recipe) {
      addRecipeIngredients(recipe.ingredients, recipe.id);
      setActiveTab('einkaufsliste');
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Ernährung</h1>
          <p className={styles.sub}>Meal-Prep-Rezepte, Filter nach Ziel und interaktive Einkaufsliste.</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={[styles.tab, activeTab === 'rezepte' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('rezepte')}
          >
            Rezepte ({recipes.length})
          </button>
          <button
            className={[styles.tab, activeTab === 'einkaufsliste' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('einkaufsliste')}
          >
            Einkaufsliste
          </button>
        </div>

        {/* REZEPTE */}
        {activeTab === 'rezepte' && (
          <div className={styles.recipeLayout}>
            {/* Toggle-Filter auf Mobile */}
            <button className={styles.filterToggle} onClick={() => setShowFilter((s) => !s)}>
              {showFilter ? 'Filter ausblenden' : 'Filter anzeigen'}
            </button>

            <div className={[styles.sidebar, showFilter ? styles.sidebarOpen : ''].join(' ')}>
              <RecipeFilterUI filter={filter} onChange={setFilter} />
            </div>

            <div className={styles.recipeGrid}>
              {recipes.length === 0 ? (
                <EmptyState
                  icon="🥗"
                  title="Keine Rezepte gefunden"
                  description="Versuche einen anderen Filter oder setze alle Filter zurück."
                  actionLabel="Filter zurücksetzen"
                  onAction={() => setFilter({})}
                />
              ) : (
                recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onAddToList={() => handleAddToList(recipe.id)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* EINKAUFSLISTE */}
        {activeTab === 'einkaufsliste' && (
          <div className={styles.shoppingWrap}>
            <ShoppingList />
          </div>
        )}
      </div>
    </main>
  );
}

