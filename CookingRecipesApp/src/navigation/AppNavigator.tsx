import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../features/recipes/screens/Home/HomeScreen';
import { LoginScreen } from '../features/recipes/screens/LoginScreen';
import { RecipeDetailsScreen } from '../features/recipes/screens/RecipeDetailsScreen';
import { RecipeFormScreen } from '../features/recipes/screens/RecipeFormScreen';
import { RecipeListScreen } from '../features/recipes/screens/RecipeListScreen';

export type RootStackParamList = {
  Login: undefined;
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

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="RecipeForm" component={RecipeFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
