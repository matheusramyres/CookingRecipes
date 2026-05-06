import { api } from '@/shared/services/api';
import { CreateRecipePayload, Recipe } from '../types/RecipeService';

export async function getRecipes(): Promise<Recipe[]> {
  const response = await api.get<Recipe[]>('/recipe');
  return response.data;
}

export async function createRecipe(payload: CreateRecipePayload): Promise<Recipe> {
  const response = await api.post<Recipe>('/recipe', payload);
  return response.data;
}
export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await api.get<Recipe>(`/recipe/${id}`);
  return response.data;
}

export async function updateRecipe(id: number, payload: CreateRecipePayload): Promise<Recipe> {
  const response = await api.patch<Recipe>(`/recipe/${id}`, payload);
  return response.data;
}

export async function deleteRecipe(id: number): Promise<void> {
  await api.delete(`/recipe/${id}`);
}
