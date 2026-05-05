export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  Home: undefined;
  RecipeList: undefined;
  RecipeDetails: {
    recipeId: number;
  };
  RecipeForm:
    | {
        recipeId?: number;
      }
    | undefined;
};
