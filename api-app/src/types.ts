export type RecipeSummary = {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
};

export type RecipesSearchResponse = {
  results: RecipeSummary[];
  offset: number;
  number: number;
  totalResults: number;
};

export type RecipeDetails = {
  id: number;
  title: string;
  image?: string;
  summary?: string;
  instructions?: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;

  extendedIngredients?: Array<{
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
  }>;

  nutrition?: unknown; // tighten later if you want
};