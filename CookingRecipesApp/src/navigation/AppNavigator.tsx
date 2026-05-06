import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../features/auth/screens/Login/LoginScreen';
import { HomeScreen } from '../features/recipes/screens/Home/HomeScreen';
import { RecipeDetailsScreen } from '../features/recipes/screens/RecipeDetails/RecipeDetailsScreen';
import { AddRecipeScreen } from '../features/recipes/screens/AddRecipe/AddRecipeScreen';
import { EditRecipeScreen } from '../features/recipes/screens/EditRecipe/EditRecipeScreen';
import { CreateAccountScreen } from '@/features/auth/screens/CreateAccount/CreateAccountScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
