export class CreateRecipeDto {
  name!: string;
  prepTimeMinutes?: number;
  servings?: number;
  preparationMethod!: string;
  ingredients?: string;
  categoryId?: number;
}
