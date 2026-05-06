export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Home: undefined;
  RecipeDetails: {
    recipeId: number;
  };
  AddRecipe:
    | {
        recipeId?: number;
      }
    | undefined;
  EditRecipe: {
    recipeId: number;
  };
};
