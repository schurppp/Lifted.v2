/*
  RecipeDetailPage - Detailansicht für ein einzelnes Rezept
  ----------------------------------------------------------
  Liest die dynamische Route /ernährung/rezept/:id und zeigt die
  statischen Rezeptdaten aus dem aktuellen Recipe-Modell.
*/
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../storage/recipeStorage';
import { useShoppingList } from '../hooks/useShoppingList';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ErrorState } from '../components/ui/ErrorState';
import styles from './RecipeDetailPage.module.css';

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Einfach',
  medium: 'Mittel',
  hard: 'Schwer',
};

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addRecipeIngredients } = useShoppingList();

  const recipe = useMemo(() => (id ? getRecipeById(id) : undefined), [id]);

  if (!recipe) {
    return (
      <div className={styles.errorWrapper}>
        <ErrorState
          title="Rezept nicht gefunden"
          message={`Ein Rezept mit der ID "${id ?? 'unbekannt'}" existiert nicht.`}
          onRetry={() => navigate('/ernährung')}
        />
      </div>
    );
  }

  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const macros = [
    { label: 'Kalorien', value: `${recipe.nutrition.calories} kcal`, color: 'orange' as const },
    { label: 'Protein', value: `${recipe.nutrition.proteinG}g`, color: 'lime' as const },
    { label: 'Kohlenhydrate', value: `${recipe.nutrition.carbsG}g`, color: 'teal' as const },
    { label: 'Fett', value: `${recipe.nutrition.fatG}g`, color: 'amber' as const },
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        <button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
          Zurück
        </button>

        <div className={styles.hero}>
          <div className={styles.heroImage}>
            <img src={recipe.image} alt={recipe.name} className={styles.image} />
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.tags}>
              {recipe.tags.map((tag) => (
                <Badge key={tag} color="teal">{tag}</Badge>
              ))}
              <Badge color="slate">{recipe.mealType}</Badge>
            </div>

            <h1 className={styles.title}>{recipe.name}</h1>
            {recipe.tip && <p className={styles.description}>{recipe.tip}</p>}

            <div className={styles.quickStats}>
              <div className={styles.stat}>
                <span className={styles.statIcon}>Zeit</span>
                <span>{totalMinutes} Min.</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statIcon}>Portionen</span>
                <span>{recipe.servings}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statIcon}>Level</span>
                <span>{DIFFICULTY_LABEL[recipe.difficulty]}</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => addRecipeIngredients(recipe.ingredients, recipe.id)}
            >
              Zur Einkaufsliste
            </Button>
          </div>
        </div>

        <div className={styles.macroGrid}>
          {macros.map((macro) => (
            <div key={macro.label} className={styles.macroCard}>
              <Badge color={macro.color}>{macro.value}</Badge>
              <span className={styles.macroLabel}>{macro.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Zutaten
              <span className={styles.sectionSub}>für {recipe.servings} Portion(en)</span>
            </h2>
            <ul className={styles.ingredientList}>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={`${ingredient.item}-${index}`} className={styles.ingredient}>
                  <span className={styles.ingredientAmount}>{ingredient.amount}</span>
                  <span className={styles.ingredientName}>{ingredient.item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Zubereitung</h2>
            <ol className={styles.stepList}>
              {recipe.steps.map((step, index) => (
                <li key={`${recipe.id}-step-${index}`} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <p className={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className={styles.timeRow}>
          <div className={styles.timeItem}>
            <span className={styles.timeLabel}>Vorbereitung</span>
            <span className={styles.timeValue}>{recipe.prepMinutes} Min.</span>
          </div>
          <div className={styles.timeDivider} />
          <div className={styles.timeItem}>
            <span className={styles.timeLabel}>Kochzeit</span>
            <span className={styles.timeValue}>{recipe.cookMinutes} Min.</span>
          </div>
          <div className={styles.timeDivider} />
          <div className={styles.timeItem}>
            <span className={styles.timeLabel}>Gesamt</span>
            <span className={styles.timeValue}>{totalMinutes} Min.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

