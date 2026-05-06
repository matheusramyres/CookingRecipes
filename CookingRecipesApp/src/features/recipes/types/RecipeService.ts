export type Recipe = {
  id: number;
  name: string;
  prepTimeMinutes?: number;
  servings?: number;
  preparationMethod: string;
  ingredients?: string;
  category?: {
    id: number;
    name: string;
  };
};

export type CreateRecipePayload = {
  name: string;
  prepTimeMinutes?: number;
  servings?: number;
  preparationMethod: string;
  ingredients?: string;
  categoryId?: number;
};
