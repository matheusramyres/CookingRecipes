import { Screen } from '@/shared/components/layout/Screen';
import { HeaderHome } from './components/HeaderHome';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { RecipeCard } from './components/RecipeCard';
import { Plus } from 'lucide-react-native';
import { getRecipes } from '../../services/recipeService';
import { useQuery } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { RecipeEmptyState } from '@/features/recipes/components/RecipeEmptyState';

export function HomeScreen() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: getRecipes,
  });

  return (
    <Screen statusBarStyle="dark-content">
      <HeaderHome />

      {!isLoading && !isError && recipes.length === 0 && <RecipeEmptyState />}

      {!isLoading && !isError && (
        <FlatList
          data={recipes}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <RecipeCard
              id={item.id}
              title={item.name}
              description={item.ingredients || ''}
              category={item.category?.name || 'Sem categoria'}
              prepTimeMinutes={item.prepTimeMinutes || 0}
              servings={item.servings || 0}
            />
          )}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
        />
      )}
      <Pressable
        style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.9 : 1 }]}
        onPress={() => navigation.navigate('AddRecipe')}>
        <Plus color="#fff" size={32} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    padding: 16,
    color: '#2A1F19',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#ff6b00',

    justifyContent: 'center',
    alignItems: 'center',

    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android
    elevation: 6,
  },
  flatListContainer: {
    padding: 16,
  },
});
