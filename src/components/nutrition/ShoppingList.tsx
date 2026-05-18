/*
  ShoppingList – Dynamisches Feature: Interaktive Einkaufsliste
  --------------------------------------------------------------
  Dynamisches Feature #3 (laut Skript: mind. 5 dynamische Features).
  Warum: Die Marktanalyse zeigt, dass Einkaufslisten einer der
  stärksten Retention-Mechanismen auf Ernährungsseiten sind.
*/
import { useState } from 'react';
import { useShoppingList } from '../../hooks/useShoppingList';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import styles from './ShoppingList.module.css';

export function ShoppingList() {
  const { items, addItem, toggleItem, removeItem, clearChecked, checkedCount, totalCount } = useShoppingList();
  const [input, setInput] = useState('');

  function handleAdd() {
    addItem(input);
    setInput('');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h3 className={styles.title}>🛒 Einkaufsliste</h3>
        {totalCount > 0 && (
          <span className={styles.count}>{checkedCount}/{totalCount}</span>
        )}
      </div>

      {/* Eingabe */}
      <div className={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Artikel hinzufügen…"
          className={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          aria-label="Artikel zur Einkaufsliste"
        />
        <Button size="sm" onClick={handleAdd} disabled={!input.trim()}>
          +
        </Button>
      </div>

      {/* Liste */}
      {items.length === 0 ? (
        <EmptyState
          icon="🛒"
          title="Noch keine Artikel"
          description="Füge Artikel hinzu oder klicke bei einem Rezept auf 'Zur Liste'."
        />
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={[styles.item, item.checked ? styles.itemChecked : ''].join(' ')}>
              <button
                className={styles.checkbox}
                onClick={() => toggleItem(item.id)}
                aria-label={item.checked ? 'Als offen markieren' : 'Als erledigt markieren'}
              >
                {item.checked ? '✓' : ''}
              </button>
              <span className={styles.itemText}>{item.text}</span>
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item.id)}
                aria-label="Entfernen"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Erledigte entfernen */}
      {checkedCount > 0 && (
        <Button variant="ghost" size="sm" fullWidth onClick={clearChecked}>
          {checkedCount} erledigte entfernen
        </Button>
      )}
    </div>
  );
}
