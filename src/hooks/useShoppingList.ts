/*
  useShoppingList Hook
  ---------------------
  Verwaltet die interaktive Einkaufsliste (dynamisches Feature #3).
  Warum eigener Hook: Die Logik ist komplex genug, um ausgelagert zu werden,
  und könnte von mehreren Komponenten (EinkaufslistenView, MealPlan) genutzt werden.
*/

import { useState } from 'react';
import type { ShoppingItem } from '../types';

const STORAGE_KEY = 'lifted_shopping_list';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as ShoppingItem[];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Bei jeder Änderung speichern
  function persist(next: ShoppingItem[]) {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addItem(text: string, recipeId?: string) {
    if (!text.trim()) return;
    const newItem: ShoppingItem = {
      id: `item-${Date.now()}`,
      text: text.trim(),
      checked: false,
      recipeId,
    };
    persist([...items, newItem]);
  }

  function toggleItem(id: string) {
    persist(items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
  }

  function removeItem(id: string) {
    persist(items.filter((item) => item.id !== id));
  }

  function clearChecked() {
    persist(items.filter((item) => !item.checked));
  }

  function addRecipeIngredients(ingredients: { amount: string; item: string }[], recipeId: string) {
    const newItems: ShoppingItem[] = ingredients.map((ing) => ({
      id: `item-${Date.now()}-${Math.random()}`,
      text: `${ing.amount} ${ing.item}`,
      checked: false,
      recipeId,
    }));
    persist([...items, ...newItems]);
  }

  const checkedCount = items.filter((i) => i.checked).length;

  return {
    items,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    addRecipeIngredients,
    checkedCount,
    totalCount: items.length,
  };
}
