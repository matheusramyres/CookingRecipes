import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../features/auth/screens/Login/LoginScreen';
import { HomeScreen } from '../features/recipes/screens/Home/HomeScreen';
import { RecipeDetailsScreen } from '../features/recipes/screens/RecipeDetails/RecipeDetailsScreen';
import { RecipeFormScreen } from '../features/recipes/screens/RecipeForm/RecipeFormScreen';
import { RecipeListScreen } from '../features/recipes/screens/RecipeList/RecipeListScreen';
import { CreateAccountScreen } from '@/features/auth/screens/CreateAccount/CreateAccountScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateAccount"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="RecipeForm" component={RecipeFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
