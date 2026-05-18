/*
  RecipeCard – Rezept-Vorschaukarte
  -----------------------------------
  Warum: Die Marktanalyse empfiehlt "oben einfach: Zeit, Portionen,
  kcal/protein, darunter optional Details". Diese Karte zeigt
  das Wesentliche sofort und verlinkt zum Detail.
*/
import { Link } from 'react-router-dom';
import type { Recipe } from '../../types';
import { Badge } from '../ui/Badge';
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToList?: () => void;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Einfach', medium: 'Mittel', hard: 'Anspruchsvoll',
};

export function RecipeCard({ recipe, onAddToList }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      {/* Bild */}
      <div className={styles.imgWrap}>
        <img src={recipe.image} alt={recipe.name} className={styles.img} loading="lazy" />
        <span className={styles.mealType}>{recipe.mealType}</span>
      </div>

      {/* Inhalt */}
      <div className={styles.body}>
        <h3 className={styles.name}>{recipe.name}</h3>

        {/* Schnellinfos: das Wichtigste auf einen Blick */}
        <div className={styles.quickStats}>
          <span>⏱ {recipe.prepMinutes + recipe.cookMinutes} Min</span>
          <span>🔥 {recipe.nutrition.calories} kcal</span>
          <span>💪 {recipe.nutrition.proteinG}g Protein</span>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} color="teal">{tag}</Badge>
          ))}
          <Badge color="slate">{DIFFICULTY_LABEL[recipe.difficulty]}</Badge>
        </div>

        {/* Aktionen */}
        <div className={styles.actions}>
          <Link to={`/ernährung/rezept/${recipe.id}`} className={styles.detailLink}>
            Rezept ansehen →
          </Link>
          {onAddToList && (
            <button className={styles.addBtn} onClick={onAddToList} title="Zur Einkaufsliste hinzufügen">
              🛒 Liste
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

