import {
  RecipeSummary,
  RecipesSearchResponse,
  RecipeDetails
} from "../../types";

const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_SPOONACULAR_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error(
    "Spoonacular API_KEY or BASE_URL not set. Make sure .env has EXPO_PUBLIC_SPOONACULAR_API_KEY and EXPO_PUBLIC_SPOONACULAR_BASE_URL"
  );
}

/**
 * Search recipes by keyword
 * Spoonacular endpoint: GET /recipes/complexSearch
 */
export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  const url =
    `${BASE_URL}/recipes/complexSearch` +
    `?apiKey=${API_KEY}` +
    `&query=${encodeURIComponent(query)}` +
    `&number=20` +
    `&addRecipeInformation=true`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Spoonacular searchRecipes failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  const data: RecipesSearchResponse = await res.json();
  return data.results ?? [];
}

/**
 * Get full recipe details
 * Spoonacular endpoint: GET /recipes/{id}/information
 */
export async function getRecipeDetails(id: string): Promise<RecipeDetails | null> {
  const url =
    `${BASE_URL}/recipes/${encodeURIComponent(id)}/information` +
    `?apiKey=${API_KEY}` +
    `&includeNutrition=true`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Spoonacular getRecipeDetails failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  const recipe: RecipeDetails = await res.json();
  return recipe ?? null;
}

/**
 * Optional: Random recipes
 * Spoonacular endpoint: GET /recipes/random
 */
export async function getRandomRecipes(number = 1): Promise<RecipeDetails[]> {
  const url =
    `${BASE_URL}/recipes/random` +
    `?apiKey=${API_KEY}` +
    `&number=${number}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Spoonacular getRandomRecipes failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  const data: { recipes: RecipeDetails[] } = await res.json();
  return data.recipes ?? [];
}